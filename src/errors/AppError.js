
class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Erros que podemos prever (não são bugs)

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;