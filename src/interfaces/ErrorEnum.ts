enum ErrorCode {
  notFound = 404,
  isRequired = 400,
  invalidData = 422,
  alreadyExists = 409,
  notAuthorized = 401,
}

enum ErrorMessage {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id must have 24 hexadecimal characters',
  requiredBody = 'Body is required',
  badRequest = 'Bad request',
}

export { ErrorCode, ErrorMessage };