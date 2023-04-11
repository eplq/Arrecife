import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { CompanySchema } from '../schemas/company';
import { router } from '../trpc';

const companyRouter = router({
    userCompanies: authedProcedure.query(async ({ ctx }) => {
        const companies = await prisma.company.findMany({
            where: {
                users: {
                    some: {
                        personId: ctx.session.id
                    }
                }
            }
        });

        return companies;
    }),

    companies: authedProcedure
        .input(z.number().int().positive())
        .query(async ({ ctx, input }) => {
            const userCompany = await prisma.company.findFirst({
                where: {
                    id: input,
                    users: {
                        some: {
                            personId: ctx.session.id
                        }
                    }
                }
            });

            if (!userCompany) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message:
                        "cant't get companies of a company that does not exists for this user"
                });
            }

            const companies = await prisma.company.findMany({
                where: {
                    owner: {
                        id: userCompany.id
                    }
                }
            });

            return companies;
        }),

    company: authedProcedure.input(z.number()).query(async ({ ctx, input }) => {
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

        return company;
    }),

    addCompany: authedProcedure
        .input(
            CompanySchema.extend({
                ownerCompany: z.number().int().positive().nullable()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existingCompany = await prisma.company.findFirst({
                where: {
                    NIF: input.NIF,
                    users: {
                        some: {
                            personId: ctx.session.id
                        }
                    },
                    OR: {
                        NIF: input.NIF,
                        ownerId: input.ownerCompany
                    }
                }
            });

            if (existingCompany)
                throw new TRPCError({
                    code: 'CONFLICT',
                    message: 'this company already exists for this user'
                });

            let newCompany;
            if (input.ownerCompany) {
                const findOwnerCompany = await prisma.company.findFirst({
                    where: {
                        id: input.ownerCompany,
                        users: {
                            some: {
                                personId: ctx.session.id
                            }
                        }
                    }
                });

                if (!findOwnerCompany)
                    throw new TRPCError({
                        code: 'NOT_FOUND',
                        message:
                            "can't find the company referred in ownerCompany"
                    });

                newCompany = await prisma.company.create({
                    data: {
                        NIF: input.NIF,
                        name: input.name,
                        address: input.address,
                        ownerId: input.ownerCompany
                    }
                });

                return newCompany.id;
            }

            newCompany = await prisma.company.create({
                data: {
                    NIF: input.NIF,
                    name: input.name,
                    address: input.address,
                    users: {
                        connect: {
                            personId: ctx.session.id
                        }
                    }
                }
            });

            return newCompany;
        }),

    deleteCompany: authedProcedure
        .input(z.number().int().positive())
        .mutation(async ({ ctx, input }) => {
            const userCompany = await prisma.company.findFirst({
                where: {
                    id: input,
                    users: {
                        some: {
                            personId: ctx.session.id
                        }
                    }
                }
            });

            if (!userCompany)
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: "can't delete a company that does not exists"
                });

            const company = await prisma.company.delete({
                where: {
                    id: userCompany.id
                }
            });

            return company;
        })
});

export default companyRouter;
