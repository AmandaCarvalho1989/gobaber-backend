import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate'
import AppointmentsController from '../controllers/AppointmentsController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderAppointmentsController from '../controllers/ProviderAppoitmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/me', providerAppointmentsController.index);

appointmentsRouter.post('/', celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date()
    }
}), appointmentsController.create);


export default appointmentsRouter;
