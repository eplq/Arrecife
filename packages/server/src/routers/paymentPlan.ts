import { z } from 'zod';

import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { router } from '../trpc';

const paymentPlansRouter = router({
    paymentPlans: authedProcedure
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

            const paymentPlans = await prisma.paymentPlan.findMany({
                where: {
                    id: company.id
                },
                include: {
                    payments: {}
                }
            });

            if (!paymentPlans.length) return null;

            return paymentPlans;
        })
});

export default paymentPlansRouter;
