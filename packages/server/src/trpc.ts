import { initTRPC } from '@trpc/server';

import { Context } from './context';

const trpc = initTRPC.context<Context>().create();

const { router, middleware, procedure: publicProcedure } = trpc;

export { router, middleware, publicProcedure };
