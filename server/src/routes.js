import { Router } from "express";

import userController from "./controllers/userController.js";
import recepieController from "./controllers/recepieController.js";

const routes = Router();

routes.use('/users', userController);
routes.use('/data/catalog', recepieController);

export default routes;
