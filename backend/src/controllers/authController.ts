import type { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { signAccessToken, signRefreshToken, generatePasswordResetToken } from '../utils/jwt.js';
import { sendPasswordResetEmail } from '../utils/email.js';
import { createError } from '../middleware/errorHandler.js';
import type { AuthRequest } from '../middleware/authenticate.js';
import type {
  RegisterInput, LoginInput, RefreshInput,
  ForgotPasswordInput, ResetPasswordInput,
} from '../schemas/authSchema.js';

const prisma = new PrismaClient();

function formatUser(user: { id: string; name: string; email: string; role: string; createdAt: Date }) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role.toLowerCase(),
    createdAt: user.createdAt.toISOString(),
  };
}

// POST /api/auth/register
export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, password } = req.body as RegisterInput;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return next(createError('An account with this email already exists', 409));
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
    const refreshTokenValue = signRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: refreshTokenValue,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    return res.status(201).json({
      user: formatUser(user),
      accessToken,
      refreshToken: refreshTokenValue,
    });
  } catch (err) {
    return next(err);
  }
}

// POST /api/auth/login
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body as LoginInput;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return next(createError('Invalid credentials', 401));
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      return next(createError('Invalid credentials', 401));
    }

    const accessToken = signAccessToken({ sub: user.id, email: user.email, role: user.role });
    const refreshTokenValue = signRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: refreshTokenValue,
        userId: user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return res.json({
      user: formatUser(user),
      accessToken,
      refreshToken: refreshTokenValue,
    });
  } catch (err) {
    return next(err);
  }
}

// POST /api/auth/refresh
export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body as RefreshInput;

    const stored = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      return next(createError('Invalid or expired refresh token', 401));
    }

    // Rotate: delete old token and issue new pair
    await prisma.refreshToken.delete({ where: { id: stored.id } });

    const newAccessToken = signAccessToken({
      sub: stored.user.id,
      email: stored.user.email,
      role: stored.user.role,
    });
    const newRefreshToken = signRefreshToken();

    await prisma.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: stored.user.id,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    return res.json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return next(err);
  }
}

// POST /api/auth/logout
export async function logout(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body as Partial<RefreshInput>;

    if (refreshToken) {
      await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    } else if (req.user?.sub) {
      // Invalidate all sessions for user
      await prisma.refreshToken.deleteMany({ where: { userId: req.user.sub } });
    }

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

// GET /api/auth/me
export async function me(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    if (!req.user?.sub) return next(createError('Unauthorized', 401));

    const user = await prisma.user.findUnique({ where: { id: req.user.sub } });
    if (!user) return next(createError('User not found', 404));

    return res.json(formatUser(user));
  } catch (err) {
    return next(err);
  }
}

// POST /api/auth/forgot-password
export async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body as ForgotPasswordInput;

    const user = await prisma.user.findUnique({ where: { email } });
    // Always return 200 to avoid user enumeration
    if (!user) {
      return res.json({ message: 'If that email exists, a reset link has been sent.' });
    }

    const token = generatePasswordResetToken();
    await prisma.passwordReset.create({
      data: {
        token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 min
      },
    });

    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password?token=${token}`;
    await sendPasswordResetEmail(user.email, user.name, resetUrl);

    return res.json({ message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    return next(err);
  }
}

// POST /api/auth/reset-password
export async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { token, password } = req.body as ResetPasswordInput;

    const reset = await prisma.passwordReset.findUnique({ where: { token } });
    if (!reset || reset.used || reset.expiresAt < new Date()) {
      return next(createError('Invalid or expired reset token', 400));
    }

    const passwordHash = await hashPassword(password);
    await prisma.user.update({
      where: { id: reset.userId },
      data: { passwordHash },
    });

    await prisma.passwordReset.update({
      where: { id: reset.id },
      data: { used: true },
    });

    // Invalidate all sessions
    await prisma.refreshToken.deleteMany({ where: { userId: reset.userId } });

    return res.json({ message: 'Password reset successfully. Please log in.' });
  } catch (err) {
    return next(err);
  }
}
