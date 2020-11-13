import { Request, Response } from 'express'
import { container } from 'tsyringe'
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgorPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const sendForgorPasswordEmail = container.resolve(SendForgotPasswordEmailService);

        await sendForgorPasswordEmail.execute({
            email,
        });

        return response.status(204).json()
    }
}
