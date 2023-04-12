import { z } from 'zod';

import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { PaymentPlanSchema } from '../schemas/paymentPlan';
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
                    companyId: company.id
                },
                include: {
                    payments: {}
                }
            });

            if (!paymentPlans.length) return null;

            return paymentPlans;
        }),

    paymentPlan: authedProcedure
        .input(
            z.object({
                company: z.number().int().positive(),
                paymentPlan: z.number().int().positive()
            })
        )
        .query(async ({ ctx, input }) => {
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

            if (!company) return null;

            const paymentPlan = await prisma.paymentPlan.findFirst({
                where: {
                    id: input.paymentPlan,
                    companyId: company.id
                },
                include: {
                    payments: {}
                }
            });

            return paymentPlan;
        }),

    createPaymentPlan: authedProcedure
        .input(
            PaymentPlanSchema.extend({
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

            if (!company) return null;

            const paymentPlan = await prisma.paymentPlan.findFirst({
                where: {
                    companyId: company.id,
                    name: input.name
                }
            });

            if (paymentPlan) return null;

            const newPaymentPlan = await prisma.paymentPlan.create({
                data: {
                    name: input.name,
                    companyId: company.id,
                    payments: {
                        createMany: {
                            data: input.payments
                        }
                    }
                }
            });

            return newPaymentPlan.id;
        }),

    deletePaymentPlan: authedProcedure
        .input(
            z.object({
                company: z.number().int().positive(),
                paymentPlan: z.number().int().positive()
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

            if (!company) return null;

            const paymentPlan = await prisma.paymentPlan.findFirst({
                where: {
                    id: input.paymentPlan,
                    companyId: company.id
                }
            });

            if (!paymentPlan) return null;

            await prisma.paymentPlan.delete({
                where: {
                    id: paymentPlan.id
                }
            });

            return true;
        })
});

export default paymentPlansRouter;
