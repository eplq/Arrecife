import type { PrismaClient } from '@prisma/client';

import { UserSchema, UserType } from '../schemas/user';

export default async function registerUser(
    userInput: UserType,
    prisma: PrismaClient
) {
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
            password: userInput.password,
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
