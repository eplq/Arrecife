import type { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

import { UserSchema, UserType } from '../schemas/user';
import generateHash from './hash';
import addTime from './time';
import generateToken from './utils';

export async function registerUser(userInput: UserType, prisma: PrismaClient) {
    const checkResult = UserSchema.safeParse(userInput);

    if (!checkResult.success) return false;

    let user = await prisma.user.findFirst({
        where: {
            email: userInput.email
        }
    });

    if (user) return false;

    user = await prisma.user.create({
        data: {
            email: userInput.email,
            password: await generateHash(userInput.password),
            person: {
                create: {
                    name: userInput.name,
                    surnames: userInput.surnames
                }
            }
        }
    });

    return user !== null;
}

export async function login(
    email: string,
    password: string,
    prisma: PrismaClient,
    tokenExpiration: number = 86400
): Promise<string | false> {
    if (isEmail(email) === false) return false;
    if (tokenExpiration < 0) return false;

    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });

    if (!user) return false;

    if ((await compare(password, user.password)) === false) return false;

    const session = await prisma.userSession.upsert({
        where: {
            userId: user.personId
        },
        create: {
            userId: user.personId,
            expires: addTime(tokenExpiration),
            token: generateToken()
        },
        update: {
            expires: addTime(tokenExpiration),
            token: generateToken()
        }
    });

    return session.token;
}

export async function isValidSession(token: string, prisma: PrismaClient) {
    if (!token) return false;

    const session = await prisma.userSession.findFirst({
        where: {
            token
        }
    });

    if (!session) return false;

    return session.expires > new Date();
}
