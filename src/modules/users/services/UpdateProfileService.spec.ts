import 'reflect-metadata'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import UpdateUserAvatarService from './UpdateUserAvatarService'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        updateProfileService = new UpdateProfileService(
            fakeUsersRepository, fakeHashProvider)
    })

    it('should be able update the profile', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Tré',
            email: 'johntre@gmail.com'
        })

        expect(updatedUser.name).toBe('John Tré')
        expect(updatedUser.email).toBe('johntre@gmail.com')

    })


    it('should  not be able to update the profile from non-existing user', async () => {

        await expect(updateProfileService.execute({
            user_id: 'non-existing-id',
            name: 'Test',
            email: 'test@gmail.com'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to change to another user email', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user = await fakeUsersRepository.create({
            name: 'Test',
            email: 'test@example.com',
            password: '123456',
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'John Doe',
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });


    it('should be able update the password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John Tré',
            email: 'johntre@gmail.com',
            old_password: '123456',
            password: '123123'
        })

        expect(updatedUser.password).toBe('123123')

    })
    it('should be not able update the password without old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'John Tré',
            email: 'johntre@gmail.com',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)

    })
    it('should be not able update the password with wrong old password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        await expect(updateProfileService.execute({
            user_id: user.id,
            name: 'John Tré',
            email: 'johntre@gmail.com',
            old_password: 'wrong-old-password',
            password: '123123'
        })).rejects.toBeInstanceOf(AppError)

    })


})
