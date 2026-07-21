import { Request, Response, NextFunction } from 'express';
import { CelebrateError } from 'celebrate';
import { BadRequestError } from '../errors/errors';
import HttpStatus from '../types/http-status';

interface AppError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { statusCode = HttpStatus.INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).json({
    message: statusCode === HttpStatus.INTERNAL_SERVER_ERROR
      ? 'Internal server error'
      : message,
  });
};

export const celebrateErrorHandler = (
  err: any,
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (err instanceof CelebrateError) {
    const errorMessage = err.details.get('body')?.details[0]?.message || 'Validation error';
    const customError = new BadRequestError(errorMessage);
    return next(customError);
  }
  return next(err);
};

export default errorHandler;
