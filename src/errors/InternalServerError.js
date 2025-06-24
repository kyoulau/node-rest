const AppError = require('./AppError');

class InternalServerError extends AppError {
  constructor(message = 'Erro interno no servidor') {
    super(message, 500);
  }
}

module.exports = InternalServerError;