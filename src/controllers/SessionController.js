import User from '../models/User';
import BadRequestError from '../errors/BadRequest';
import ConflictError from '../errors/ConflictError';
import InternalServerError from '../errors/InternalServerError';
import AppError from '../errors/AppError';
import { generateHash } from '../lib/hash';

class SessionController{

  //index: lista sessoes

  //store: Cria sessão
  async store(req, res){
    const { email, password, name }= req.body;

    if (!name || !email || !password) {
      throw new BadRequestError("Por favor, preencha todos os campos.");
    }

    try {
      // const existingUser = await User.findOne({ email });

      // if (existingUser) {
      //   throw new ConflictError('Email já cadastrado. Por favor, utilize outro email.');
      // }

      const hashedPassword = await generateHash(password);

      const newUser = await User.create({ 
        email, 
        password: hashedPassword, 
        name 
      });

      const userResponse = {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }

      return res.status(201).json(userResponse);

    } catch (error) {
      if (error instanceof AppError){
        return res.status(error.statusCode).json({
          error: error.message,
          status: error.status,
      });
      }
      console.error('Erro inesperado:', error);
      const internalError = new InternalServerError();
      return res.status(internalError.statusCode).json({
        error: internalError.message,
        status: internalError.status,
      });
    }
  }

  //show: Lista pelo Id

  //update: Atualiza sessão

  //destroy: Deleta sessão

}

export default new SessionController();