import User from '@modules/users/infra/typeorm/entities/User';

export default class UserMap {
    // public static toDomain(): User {}

    // public static toPersistence(): User {}

    public static toDTO(user: User): Omit<User, 'password'> {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            getAvatarUrl: () => user.getAvatarUrl() ,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };
    }
}
