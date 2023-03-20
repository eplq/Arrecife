import { createExpressMiddleware } from '@trpc/server/adapters/express';
import express from 'express';

import createContext from './context';
import router from './routers';

const app = express();

app.use(
    '/trpc',
    createExpressMiddleware({
        router,
        createContext
    })
);

export default app;
