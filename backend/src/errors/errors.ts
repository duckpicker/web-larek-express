// eslint-disable-next-line max-classes-per-file
export class BadRequestError extends Error {
  statusCode = 400;

  // eslint-disable-next-line no-useless-constructor
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends Error {
  statusCode = 404;

  // eslint-disable-next-line no-useless-constructor
  constructor(message: string) {
    super(message);
  }
}

export class ConflictError extends Error {
  statusCode = 409;

  // eslint-disable-next-line no-useless-constructor
  constructor(message: string) {
    super(message);
  }
}
