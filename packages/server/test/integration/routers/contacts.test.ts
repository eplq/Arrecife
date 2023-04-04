import { PrismaClient } from '@prisma/client';

import contactsRouter from '../../../src/routers/contacts';
import resetDB from '../../utils';

const prisma = new PrismaClient();
const caller = contactsRouter.createCaller({
    session: {
        id: 1,
        email: 'a@a.com',
        name: 'asd',
        surnames: 'asd'
    }
});

beforeAll(async () => {
    await resetDB(prisma);

    const user = await prisma.user.create({
        data: {
            email: 'asd@asd.com',
            password: 'asd',
            person: {
                create: { name: 'asd', surnames: 'asd' }
            }
        }
    });

    // id: 1
    const company = await prisma.company.create({
        data: {
            NIF: '12345678A',
            name: 'ASD SL',
            address: 'Calle Asd, Bajo',
            users: {
                connect: {
                    personId: user.personId
                }
            }
        }
    });

    // id: 2
    await prisma.company.create({
        data: {
            NIF: '19283746C',
            name: 'No Contacts SL',
            address: 'Calle Asd, Bajo',
            ownerId: company.id
        }
    });

    // id: 3
    const contactsCompany = await prisma.company.create({
        data: {
            NIF: '87654321B',
            name: 'Contacts SL',
            address: 'Calle Asd, Bajo',
            ownerId: company.id
        }
    });

    await prisma.contact.create({
        data: {
            role: 'Administrador',
            person: {
                create: { name: 'Julio', surnames: 'Iglesias' }
            },
            company: {
                connect: {
                    id: contactsCompany.id
                }
            }
        }
    });

    await prisma.contact.create({
        data: {
            role: 'Dueño',
            person: {
                create: { name: 'Julio', surnames: 'Iglesias' }
            },
            company: {
                connect: {
                    id: company.id
                }
            }
        }
    });
});

describe('contacts tests', () => {
    it('create contact', async () => {});
    it('get contact', async () => {});
    it('get contacts of company', async () => {
        const contacts = await caller.contacts(3);

        expect(contacts).toStrictEqual([
            {
                companyId: 3,
                personId: 2,
                role: 'Administrador',
                person: {
                    id: 2,
                    name: 'Julio',
                    surnames: 'Iglesias'
                }
            }
        ]);

        // no company
        expect(await caller.contacts(99)).toBeNull();

        // no contacts
        expect(await caller.contacts(2)).toBeNull();

        expect(await caller.contacts(1)).toBeNull();
    });
    it('modify contact', async () => {});
    it('delete contact', async () => {});
});
