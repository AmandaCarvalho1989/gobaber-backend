import 'reflect-metadata'
import ListProvidersService from './ListProvidersService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import AppError from '@shared/errors/AppError'
import ShowProfileService from '@modules/users/services/ShowProfileService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviders', () => {

    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeCacheProvider = new FakeCacheProvider()
        listProvidersService = new ListProvidersService(fakeUsersRepository, fakeCacheProvider)

    })

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })
        const user2 = await fakeUsersRepository.create({
            name: 'John Tre',
            email: 'johntre@gmail.com',
            password: '123456'
        })

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@gmail.com',
            password: '123456'
        })

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id,
        })

        expect(providers).toEqual([
            user1,
            user2
        ])
    })
})
