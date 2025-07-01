import InternalServerError from '../errors/InternalServerError';
import AppError from '../errors/AppError';
import House from '../models/House';
import Reservation from '../models/Reservation';
import * as Yup from 'yup';

class ReservationController {

  async index(req, res) {
    try {
      const { user_id } = req.headers;

      const reservations = await Reservation.find({ user: user_id }).populate('house').populate('user')


      return res.json(reservations);

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

  async store(req, res) {
    const schema = Yup.object().shape({
      date: Yup.date().required(),
    })
    try {

      if (!(await schema.isValid(req.body))) {
        throw new BadRequestError('Dados inválidos');
      }

      const { house_id } = req.params;
      const { user_id } = req.headers;
      const { date } = req.body;

      const house = await House.findById(house_id);

      if (!house) {
        throw new AppError('Imovel nao encontrado', 400);
      }

      if(house.status !== true) {
        throw new AppError('Imovel indisponivel', 400);
      }

      if (String(user_id) === String(house.user)) {
        throw new AppError('IVoce não pode reservar seu próprio imovel', 401);
      }

      const reserve = await Reservation.create({
        date,
        user: user_id,
        house: house_id
      })

      const populateReserve = await Reservation.findById(reserve._id).
      populate('house')
      .populate('user')


      return res.json(populateReserve);

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

  async destroy(req, res) {
    try {
      const {reservation_id} = req.body;

      if (!reservation_id) {
        throw new AppError('Reserva nao encontrada', 400);
      }

      await Reservation.findByIdAndDelete(reservation_id);

      return res.json({message: 'Reserva deletada com sucesso'});
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
}

export default new ReservationController();
