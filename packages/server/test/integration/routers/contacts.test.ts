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

    await prisma.contact.create({
        data: {
            company: {
                connect: {
                    id: company.id
                }
            },
            role: 'Administrador',
            person: {
                create: { name: 'Julio', surnames: 'Iglesias' }
            }
        }
    });
});

describe('contacts tests', () => {
    it('create contact', async () => {});
    it('get contact', async () => {});
    it('get contacts of company', async () => {
        const contacts = await caller.contacts(1);

        expect(contacts).toStrictEqual([
            {
                companyId: 1,
                personId: 2,
                role: 'Administrador',
                person: {
                    id: 2,
                    name: 'Julio',
                    surnames: 'Iglesias'
                }
            }
        ]);
    });
    it('modify contact', async () => {});
    it('delete contact', async () => {});
});
