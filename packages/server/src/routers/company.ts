import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { router } from '../trpc';

const companyRouter = router({
    companies: authedProcedure.query(async ({ ctx }) => {
        const userCompanies = await prisma.company.findMany({
            where: {
                users: {
                    every: {
                        userId: ctx.session.id
                    }
                }
            }
        });

        return userCompanies;
    })
});

export default companyRouter;
