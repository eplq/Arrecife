import type { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';
import isEmail from 'validator/lib/isEmail';

import generateHash from '../auth/hash';
import addTime from '../auth/time';
import generateToken from '../auth/utils';
import { UserSchema, UserType } from '../schemas/user';

export async function registerUser(userInput: UserType, prisma: PrismaClient) {
    const checkResult = UserSchema.safeParse(userInput);

    if (!checkResult.success) return false;

    let user;
    user = await prisma.user.findFirst({
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

    return true;
}

export async function login(
    email: string,
    password: string,
    prisma: PrismaClient
): Promise<string | false> {
    if (isEmail(email) === false) return false;

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
            expires: addTime(86400),
            token: generateToken()
        },
        update: {
            expires: addTime(86400),
            token: generateToken()
        }
    });

    return session.token;
}

// export async function isValidSession(token: string) {}
