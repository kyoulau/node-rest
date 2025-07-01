import { Router } from "express";
import SessionController from "./controllers/SessionController";
import SessionController from "./controllers/SessionController";
import HouseController from "./controllers/HouseController";
import multer from "multer";
import uploadConfig from "./config/upload";
import DashboardController from "./controllers/DashboardController";

const routes = new Router();
const upload = multer(uploadConfig);

routes.get('/', (req, res) => {
  return res.json({ ok: false });
});

routes.post('/sessions', SessionController.store);
routes.get('/sessions/:user_id', SessionController.showById);
routes.delete('/sessions/:user_id', SessionController.destroyUserById);

routes.post('/houses', upload.single('thumbnail'), HouseController.store);
routes.get('/houses', HouseController.index);
routes.put('/houses/:house_id', upload.single('thumbnail'), HouseController.update);
routes.get('/houses/:house_id', HouseController.showById);
routes.delete('/houses/:house_id', HouseController.destroyById);

routes.get('/dashboard', DashboardController.index);

export default routes;