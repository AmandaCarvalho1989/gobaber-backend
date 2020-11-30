import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequest {
    provider_id: string,
    month: number;
    year: number;
    day: number
}


@injectable()
class ListProviderAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository
    ) { }
    public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {

        const appoitments = await this.appointmentsRepository.findAllInDayFromProvider({
            day,
            month,
            year,
            provider_id
        })

        return appoitments
    }
}

export default ListProviderAppointmentsService;
