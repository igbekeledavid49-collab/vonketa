import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendPasswordResetEmail(
  to: string,
  name: string,
  resetUrl: string
): Promise<void> {
  await transporter.sendMail({
    from: `"Positivus" <${process.env.SMTP_FROM || 'noreply@positivus.com'}>`,
    to,
    subject: 'Reset your Positivus password',
    text: `Hi ${name},\n\nClick the link below to reset your password:\n\n${resetUrl}\n\nThis link expires in 15 minutes. If you didn't request this, you can safely ignore this email.\n\nBest,\nThe Positivus Team`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 32px; background: #141414; color: #fff; border-radius: 16px;">
        <h2 style="color: #B9FF66; margin: 0 0 16px;">Reset your password</h2>
        <p>Hi ${name},</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; margin: 20px 0; padding: 12px 28px; background: #B9FF66; color: #0A0A0A; border-radius: 100px; font-weight: 700; text-decoration: none;">
          Reset Password
        </a>
        <p style="color: #B3B3B3; font-size: 13px;">This link expires in 15 minutes.</p>
        <p style="color: #B3B3B3; font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #2A2A2A; margin: 24px 0;" />
        <p style="color: #B3B3B3; font-size: 12px;">© 2026 Positivus. All rights reserved.</p>
      </div>
    `,
  });
}
