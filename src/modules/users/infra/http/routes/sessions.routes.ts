import { Router } from 'express';

import SessiosnController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessiosnController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
