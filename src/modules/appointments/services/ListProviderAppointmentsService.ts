import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import Appointment from '../infra/typeorm/entities/Appointment';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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
        private appointmentsRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) { }
    public async execute({ provider_id, month, year, day }: IRequest): Promise<Appointment[]> {

        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`

        let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey)

        if (!appointments) {
            appointments = await this.appointmentsRepository.findAllInDayFromProvider({
                day,
                month,
                year,
                provider_id
            })


            console.log('fez a query')
            await this.cacheProvider.save(cacheKey, appointments)
        }

        return appointments
    }
}

export default ListProviderAppointmentsService;
