import { PrismaClient } from '@prisma/client';

import { login, registerUser } from '../../../src/auth/actions';

const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.userSession.deleteMany();
    await prisma.user.deleteMany();
    await prisma.person.deleteMany();
    await prisma.$queryRaw`ALTER TABLE Person AUTO_INCREMENT = 0`;
});

describe('register', () => {
    test('correo invalido', async () => {
        const registerResult = await registerUser(
            {
                name: 'aleatorio',
                surnames: 'aleatorio',
                email: 'correoinvalido',
                password: 'unacontraseñacualquiera'
            },
            prisma
        );

        expect(registerResult).toBeFalsy();
    });

    test('registro valido', async () => {
        const registerResult = await registerUser(
            {
                name: 'aleatorio',
                surnames: 'aleatorio',
                email: 'a@example.com',
                password: 'unacontraseñacualquiera'
            },
            prisma
        );

        expect(registerResult).toBeTruthy();
    });

    test('registro repetido (email)', async () => {
        const registerResult = await registerUser(
            {
                name: 'aleatorio',
                surnames: 'aleatorio',
                email: 'a@example.com',
                password: 'unacontraseñacualquiera'
            },
            prisma
        );

        expect(registerResult).toBeFalsy();
    });
});

describe('login', () => {
    test('invalid email', async () => {
        const loginResult = await login('invalidemail', 'aaaa', prisma);
        expect(loginResult).toBeFalsy();
    });

    test('invalid token expiration time', async () => {
        const loginResult = await login('a@example.com', 'aaaa', prisma, -5);
        expect(loginResult).toBeFalsy();
    });

    test('no user', async () => {
        const loginResult = await login(
            'inexistentemail@example.com',
            'unacontraseñacualquiera',
            prisma
        );
        expect(loginResult).toBeFalsy();
    });

    test('successful login', async () => {
        const loginResult = await login(
            'a@example.com',
            'unacontraseñacualquiera',
            prisma
        );
        expect(typeof loginResult).toBe('string');
    });
});
