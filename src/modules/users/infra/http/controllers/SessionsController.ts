import { Request, Response } from 'express'
import { container } from 'tsyringe'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserMap from '../../typeorm/mapper/userMap';

export default class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const authenticatedUser = container.resolve(AuthenticateUserService);

        const { user, token } = await authenticatedUser.execute({
            email,
            password
        });

        const userMap = UserMap.toDTO(user)

        // delete user.password;

        return response.json({ user: userMap, token });
    }
}
