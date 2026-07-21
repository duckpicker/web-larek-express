import HttpStatus from '../types/http-status';

export class BadRequestError extends Error {
  statusCode = HttpStatus.BAD_REQUEST;
}

export class NotFoundError extends Error {
  statusCode = HttpStatus.NOT_FOUND;
}

export class ConflictError extends Error {
  statusCode = HttpStatus.CONFLICT;
}