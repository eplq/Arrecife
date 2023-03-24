import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { router } from '../trpc';

const companyRouter = router({
    companies: authedProcedure.query(async ({ ctx }) => {
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
    })
});

export default companyRouter;
