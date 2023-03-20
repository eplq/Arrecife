import { TRPCError } from '@trpc/server';

import { middleware } from '../trpc';

const isAuthed = middleware(async ({ ctx, next }) => {
    if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' });

    return next({
        // https://trpc.io/docs/server/middlewares#context-swapping
        ctx: {
            session: {
                name: ctx.session.name,
                surnames: ctx.session.surnames,
                id: ctx.session.id,
                email: ctx.session.email
            }
        }
    });
});

export default isAuthed;
