import { Router } from "express";
import SessionController from "./controllers/SessionController";
import SessionController from "./controllers/SessionController";

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ ok: false });
});

routes.post('/sessions', SessionController.store);
// routes.post('/sessions', SessionController.store);

export default routes;