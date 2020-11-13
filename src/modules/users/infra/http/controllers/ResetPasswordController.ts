import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class resetPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { password, token } = request.body;

        const resetPasssword = container.resolve(ResetPasswordService);

        await resetPasssword.execute({
            token,
            password
        });

        return response.status(204).json()
    }
}
