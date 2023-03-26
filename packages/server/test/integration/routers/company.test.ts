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

    const user2 = await prisma.user.create({
        data: {
            email: 'qwe@qwe.com',
            password: 'qwe',
            person: {
                create: { name: 'qwe', surnames: 'qwe' }
            }
        }
    });

    await prisma.company.create({
        data: {
            NIF: '19283746C',
            name: 'Other Owned SL',
            address: 'Calle en Propiedad, Segundo',
            users: {
                create: {
                    userId: user2.personId,
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

    it('get specific company', async () => {
        const company = await caller.company(1);

        expect(company).toStrictEqual({
            NIF: '12345678A',
            name: 'ASD SL',
            address: 'Calle Asd, Bajo',
            id: 1
        });

        const inexistentCompany = await caller.company(99);
        expect(inexistentCompany).toStrictEqual(null);

        const otherUserCompany = await caller.company(3);
        expect(otherUserCompany).toStrictEqual(null);
    });

    it('create company', async () => {
        const company = await caller.addCompany({
            NIF: '13243546D',
            name: 'Compañía SL',
            address: 'no'
        });

        expect(company).toStrictEqual({
            id: 4,
            NIF: '13243546D',
            name: 'Compañía SL',
            address: 'no'
        });

        const invalidCompany = async () =>
            caller.addCompany({
                NIF: '13243546D',
                name: 'Compañía SL',
                address: 'no'
            });

        expect(invalidCompany).rejects.toThrowError(
            'this company already exists for this user'
        );
    });
});
