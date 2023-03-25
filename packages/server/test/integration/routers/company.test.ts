import { PrismaClient } from '@prisma/client';

import companyRouter from '../../../src/routers/company';
import resetDB from '../../utils';

const prisma = new PrismaClient();
const caller = companyRouter.createCaller({
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

    await prisma.company.create({
        data: {
            NIF: '12345678A',
            name: 'ASD SL',
            address: 'Calle Asd, Bajo',
            users: {
                create: {
                    userId: user.personId,
                    managesIt: false
                }
            }
        }
    });

    await prisma.company.create({
        data: {
            NIF: '87654321B',
            name: 'Owned SL',
            address: 'Calle en Propiedad, Bajo',
            users: {
                create: {
                    userId: user.personId,
                    managesIt: true
                }
            }
        }
    });
});

describe('companies', () => {
    it('get not owned user companies', async () => {
        const companies = await caller.notOwnedCompanies();

        expect(companies).toStrictEqual([
            {
                NIF: '12345678A',
                name: 'ASD SL',
                address: 'Calle Asd, Bajo',
                id: 1
            }
        ]);
    });

    it('get user owned companies', async () => {
        const companies = await caller.ownedCompanies();

        expect(companies).toStrictEqual([
            {
                NIF: '87654321B',
                name: 'Owned SL',
                address: 'Calle en Propiedad, Bajo',
                id: 2
            }
        ]);
    });

    it('get all user companies', async () => {
        const companies = await caller.companies();

        expect(companies).toStrictEqual([
            {
                NIF: '12345678A',
                name: 'ASD SL',
                address: 'Calle Asd, Bajo',
                id: 1
            },
            {
                NIF: '87654321B',
                name: 'Owned SL',
                address: 'Calle en Propiedad, Bajo',
                id: 2
            }
        ]);
    });
});
