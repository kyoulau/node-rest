const AppError = require('./AppError');

class ConflictError extends AppError {
  constructor(message = 'Conflito: o recurso já existe') {
    super(message, 409);
  }
}

module.exports = ConflictError;