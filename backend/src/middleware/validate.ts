import type { Request, Response, NextFunction } from 'express';
import { z, type ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.errors.reduce<Record<string, string>>((acc, err) => {
        const key = err.path.join('.');
        acc[key] = err.message;
        return acc;
      }, {});

      res.status(422).json({
        message: 'Validation failed',
        errors,
      });
      return;
    }

    req.body = result.data as z.infer<typeof schema>;
    next();
  };
}
