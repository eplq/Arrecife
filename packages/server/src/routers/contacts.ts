import { z } from 'zod';

import prisma from '../prisma';
import authedProcedure from '../procedures/authedProcedure';
import { ContactSchema } from '../schemas/contacts';
import { router } from '../trpc';

const contactsRouter = router({
    contacts: authedProcedure
        .input(z.number().int().positive())
        .query(async ({ ctx, input }) => {
            const company = await prisma.company.findFirst({
                where: {
                    id: input,
                    owner: {
                        users: {
                            some: {
                                personId: ctx.session.id
                            }
                        }
                    }
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

            if (!contacts.length) return null;

            return contacts;
        }),

    contact: authedProcedure
        .input(
            z.object({
                contact: z.number().int().positive(),
                company: z.number().int().positive()
            })
        )
        .query(async ({ ctx, input }) => {
            const contact = await prisma.contact.findFirst({
                where: {
                    company: {
                        id: input.company,
                        owner: {
                            users: {
                                some: {
                                    personId: ctx.session.id
                                }
                            }
                        }
                    },
                    personId: input.contact
                },
                include: {
                    person: {
                        include: {
                            emails: {},
                            phones: {}
                        }
                    }
                }
            });

            if (!contact) return null;

            return {
                id: contact.personId,
                name: contact.person.name,
                surnames: contact.person.surnames,
                role: contact.role,
                emails: contact.person.emails.map(
                    (emailRecord) => emailRecord.email
                ),
                phones: contact.person.phones.map(
                    (phoneRecord) => phoneRecord.phone
                )
            };
        }),

    createContact: authedProcedure
        .input(
            ContactSchema.extend({
                company: z.number().int().positive()
            })
        )
        .mutation(async ({ ctx, input }) => {
            const company = await prisma.company.findFirst({
                where: {
                    id: input.company,
                    owner: {
                        users: {
                            some: {
                                personId: ctx.session.id
                            }
                        }
                    }
                }
            });

            if (!company) return false;

            const findContact = await prisma.contact.findFirst({
                where: {
                    role: input.role,
                    person: {
                        name: input.name,
                        surnames: input.surnames
                    },
                    company: {
                        id: company.id
                    }
                }
            });

            if (findContact) return false;

            const newContact = await prisma.contact.create({
                data: {
                    role: input.role,
                    person: {
                        create: {
                            name: input.name,
                            surnames: input.surnames,
                            emails: {
                                createMany: {
                                    data: input.emails.map((email) => ({
                                        email
                                    }))
                                }
                            },
                            phones: {
                                createMany: {
                                    data: input.phones.map((phone) => ({
                                        phone
                                    }))
                                }
                            }
                        }
                    },
                    company: {
                        connect: {
                            id: company.id
                        }
                    }
                }
            });

            return newContact;
        })
});

export default contactsRouter;
