import House from "../models/House";

class DashboardController {

  async index(req, res) {
  const {user_id} = req.headers;
  const house = await House.find({user: user_id});

  return res.json(house);
  }

};

export default new DashboardController();