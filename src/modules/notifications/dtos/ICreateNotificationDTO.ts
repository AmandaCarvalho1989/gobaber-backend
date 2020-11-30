import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";

export default interface ICreateNotificationDTO {
    content: string;
    recipient_id: string
}
