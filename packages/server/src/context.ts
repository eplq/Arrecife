import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

import { getSession } from './auth/actions';
import prisma from './prisma';

export default async function createContext(opts: CreateExpressContextOptions) {
    const cookieId: string = opts.req.cookies.id;
    const session = await getSession(cookieId, prisma);

    return {
        session
    };
}

export type Context = inferAsyncReturnType<typeof createContext>;
