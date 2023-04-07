import { z } from 'zod';

import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { TaxSchema } from '../schemas/tax';
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
        }),

    addTax: authedProcedure
        .input(
            TaxSchema.extend({
                company: z.number().int().positive()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const company = await prisma.company.findFirst({
                where: {
                    id: input.company,
                    users: {
                        some: {
                            personId: ctx.session.id
                        }
                    }
                }
            });

            if (!company) return false;

            const tax = await prisma.tax.findFirst({
                where: {
                    companyId: company.id,
                    name: input.name,
                    rate: input.rate
                }
            });

            if (tax) return false;

            const newTax = await prisma.tax.create({
                data: {
                    name: input.name,
                    rate: input.rate,
                    companyId: company.id
                }
            });

            return !!newTax;
        })
});

export default taxRouter;
