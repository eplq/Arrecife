import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { CompanySchema } from '../schemas/company';
import { router } from '../trpc';

const companyRouter = router({
    companies: authedProcedure.query(async ({ ctx }) => {
        const companiesUser = await prisma.userCompany.findMany({
            where: {
                userId: ctx.session.id
            }
        });

        const companies = await prisma.company.findMany({
            where: {
                id: {
                    in: companiesUser.map((item) => item.companyId)
                }
            }
        });

        return companies;
    }),

    ownedCompanies: authedProcedure.query(async ({ ctx }) => {
        const companiesUser = await prisma.userCompany.findMany({
            where: {
                userId: ctx.session.id,
                managesIt: true
            }
        });

        const companies = await prisma.company.findMany({
            where: {
                id: {
                    in: companiesUser.map((item) => item.companyId)
                }
            }
        });

        return companies;
    }),

    notOwnedCompanies: authedProcedure.query(async ({ ctx }) => {
        const companiesUser = await prisma.userCompany.findMany({
            where: {
                userId: ctx.session.id,
                managesIt: false
            }
        });

        const companies = await prisma.company.findMany({
            where: {
                id: {
                    in: companiesUser.map((item) => item.companyId)
                }
            }
        });

        return companies;
    }),

    company: authedProcedure.input(z.number()).query(async ({ ctx, input }) => {
        const userCompany = await prisma.userCompany.findFirst({
            where: {
                companyId: input,
                userId: ctx.session.id
            }
        });

        if (!userCompany) return null;

        const company = await prisma.company.findFirst({
            where: {
                id: userCompany.companyId
            }
        });

        return company;
    }),

    addCompany: authedProcedure
        .input(
            CompanySchema.extend({
                managesIt: z.boolean().default(false)
            })
        )
        .mutation(async ({ ctx, input }) => {
            const userCompany = await prisma.userCompany.findFirst({
                where: { company: { NIF: input.NIF }, userId: ctx.session.id }
            });

            if (userCompany)
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'this company already exists for this user'
                });

            const newCompany = await prisma.company.create({
                data: {
                    NIF: input.NIF,
                    name: input.name,
                    address: input.address,
                    users: {
                        create: {
                            userId: ctx.session.id,
                            managesIt: input.managesIt
                        }
                    }
                }
            });

            return newCompany;
        })
});

export default companyRouter;
