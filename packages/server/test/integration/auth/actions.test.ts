import { PrismaClient } from '@prisma/client';

import { isValidSession, login, registerUser } from '../../../src/auth/actions';

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

describe('session', () => {
    afterEach(() => {
        jest.useFakeTimers().setSystemTime(new Date());
    });

    test('no token', async () => {
        const result = await isValidSession('', prisma);
        expect(result).toBeFalsy();
    });

    test('no session', async () => {
        const result = await isValidSession('nosession', prisma);
        expect(result).toBeFalsy();
    });

    test('valid session', async () => {
        const userSession = await prisma.userSession.findFirst();
        const token = userSession?.token!;

        const result = await isValidSession(token, prisma);
        expect(result).toBeTruthy();
    });

    test('invalid session', async () => {
        const userSession = await prisma.userSession.findFirst();
        const token = userSession?.token!;

        const day = 1000 * 60 * 60 * 24;
        const future = new Date(new Date().getTime() + 3 * day);
        jest.useFakeTimers().setSystemTime(future);

        const result = await isValidSession(token, prisma);
        expect(result).toBeFalsy();
    });
});
