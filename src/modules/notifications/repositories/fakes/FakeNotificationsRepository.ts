import { ObjectID } from 'mongodb'

import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateNotificationDTO from '../../dtos/ICreateNotificationDTO'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import Notification from '../../infra/typeorm/schemas/Notification'

class FakeNotificationsRepository implements INotificationsRepository {
    private notifications: Notification[] = []
    private ormRepository: MongoRepository<Notification>;


    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
        const notification = new Notification()

        Object.assign(notification, { id: new ObjectID(), content, recipient_id })

        this.notifications.push(notification)

        await this.ormRepository.save(notification)

        return notification;
    }
}

export default FakeNotificationsRepository;
