import { z } from 'zod';

import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { router } from '../trpc';

const taxRouter = router({
    taxes: authedProcedure
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

            const taxes = await prisma.tax.findMany({
                where: {
                    companyId: company.id
                }
            });

            return taxes;
        })
});

export default taxRouter;
