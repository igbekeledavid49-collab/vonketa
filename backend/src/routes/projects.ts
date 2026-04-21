import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { PrismaClient } from '@prisma/client';
import { createError } from '../middleware/errorHandler.js';
import type { AuthRequest } from '../middleware/authenticate.js';
import type { Response, NextFunction } from 'express';

const router = Router();
const prisma = new PrismaClient();

// All project routes require authentication
router.use(authenticate);

// GET /api/projects
router.get('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const projects = await prisma.project.findMany({
      where: { userId: req.user!.sub },
      orderBy: { updatedAt: 'desc' },
    });
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

// POST /api/projects
router.post('/', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description, status } = req.body as { title: string; description?: string; status?: 'ACTIVE' | 'PAUSED' | 'COMPLETED' };
    if (!title?.trim()) {
      return next(createError('Project title is required', 422));
    }
    const project = await prisma.project.create({
      data: {
        title: title.trim(),
        description: description?.trim(),
        status: status ?? 'ACTIVE',
        userId: req.user!.sub,
      },
    });
    return res.status(201).json(project);
  } catch (err) {
    return next(err);
  }
});

// PATCH /api/projects/:id
router.patch('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await prisma.project.findFirst({
      where: { id: req.params.id, userId: req.user!.sub },
    });
    if (!project) return next(createError('Project not found', 404));

    const updated = await prisma.project.update({
      where: { id: project.id },
      data: req.body as object,
    });
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

// DELETE /api/projects/:id
router.delete('/:id', async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await prisma.project.findFirst({
      where: { id: req.params.id, userId: req.user!.sub },
    });
    if (!project) return next(createError('Project not found', 404));

    await prisma.project.delete({ where: { id: project.id } });
    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
});

export default router;
