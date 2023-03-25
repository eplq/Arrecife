import { z } from 'zod';

import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
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
    })
});

export default companyRouter;
