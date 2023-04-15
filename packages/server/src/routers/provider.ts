import { z } from 'zod';

import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { router } from '../trpc';

const providersRouter = router({
    providers: authedProcedure
        .input(z.number().int().positive())
        .query(async ({ ctx, input }) => {
            const company = await prisma.company.findFirst({
                where: {
                    id: input,
                    users: {
                        some: {
                            personId: ctx.session.id
                        }
                    }
                }
            });

            if (!company) return null;

            const providers = await prisma.provider.findMany({
                where: {
                    companyId: company.id
                },
                include: {
                    company: {}
                }
            });

            if (!providers.length) return null;

            return providers;
        })
});

export default providersRouter;
