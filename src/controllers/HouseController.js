import User from '../models/User';
import BadRequestError from '../errors/BadRequest';
import ConflictError from '../errors/ConflictError';
import InternalServerError from '../errors/InternalServerError';
import AppError from '../errors/AppError';
import { generateHash } from '../lib/hash';
import House from '../models/House';
import User from '../models/User';
import * as Yup from 'yup';

class HouseController{

  async index(req, res){
    try {
      const { status }= req.query;

      const houses = await House.find({ status });

      return res.json(houses);
    } catch (error) {

    }

  }

  async store(req, res){

    const schema = Yup.object().shape({
      description: Yup.string().required(),
      price: Yup.number().required(),
      location: Yup.string().required(),
      status: Yup.boolean().required(),
    });

    try {
      const { filename } = req.file;
      const { description, price, location, status }= req.body;
      const { user_id } = req.headers;

      if (!(await schema.isValid(req.body))) {
      throw new BadRequestError('Dados inválidos');
    }

      const house = await House.create({
        user: user_id,
        thumbnail: filename,
        description,
        price,
        location,
        status
      })

      return res.json(house);

    } catch (error) {
    }
  }

  //show: Lista pelo Id
  async showById(req, res){
    try {
      const {house_id} = req.params;

      const house = await House.findById(house_id);

      return res.json(house);
    } catch (error) {
      console.log(error);
    }
  }

  //update: Atualiza sessão
  async update(req, res){
    try {
      const {house_id} = req.params;
      const {description, price, location, status} = req.body;
      const {user_id} = req.headers;

      const user = await User.findById(user_id);
      if (!user) {
        throw new AppError('Usuario nao encontrado', 404);
      }

      const house = await House.findById(house_id);
      if (!house) {
        throw new AppError('Imóvel não encontrado', 404);
    }

      if (String(user_id) !== String(house.user)){
        new ConflictError('Imovel nao pertence ao usuario');
      }

      let newThumbnail = house.thumbnail;
      if (req.file) {
      newThumbnail = req.file.filename;
    }

      const updatedHouse = await House.updateOne({_id: house_id,},
      {
        user: user_id,
        thumbnail: newThumbnail,
        description,
        price,
        location,
        status
      }
    );
      return res.send();
    } catch (error) {
      console.log(error);
    }
  }

  //destroy: Deleta sessão
  async destroyById(req, res, next){
    try {
      const {house_id} = req.params;
      const {user_id} = req.headers;

      const house = await House.findById(house_id);
      if (!house) {
        new BadRequestError('Imovel nao encontrado');
      }

      if(!user_id){
        throw new AppError('Usuario nao encontrado', 401);
      }

      if (String(user_id) !== String(house.user)){
        throw new ConflictError('Imovel nao pertence ao usuario');
      }

      await House.deleteOne({_id: house_id});

      return res.json({message: 'Imovel deletado com sucesso'});

    } catch (error) {
      console.log(error);
      next(error);
    }
  }

}

export default new HouseController();
