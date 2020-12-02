import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
// eslint-disable-next-line @typescript-eslint/naming-convention
export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
    findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
    findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>;
}
