import { z } from 'zod';

import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { router } from '../trpc';

const contactsRouter = router({
    contacts: authedProcedure
        .input(z.number().int().positive())
        .query(async ({ ctx, input }) => {
            const company = await prisma.company.findFirst({
                where: {
                    id: input,
                    users: {
                        some: {
                            personId: ctx.session.id
                        }
                    },
                    owner: null
                }
            });

            if (!company) return null;

            const contacts = await prisma.contact.findMany({
                where: {
                    companyId: company.id
                },
                include: {
                    person: {}
                }
            });

            if (!contacts) return null;

            return contacts;
        })
});

export default contactsRouter;
