import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).json({
    message: statusCode === 500 ? 'Internal server error' : message,
  });
};

export default errorHandler;
