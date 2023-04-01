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

    await prisma.company.create({
        data: {
            NIF: '87654321B',
            name: 'Owned SL',
            address: 'Calle en Propiedad, Bajo',
            users: {
                connect: {
                    personId: user.personId
                }
            },
            ownerId: company.id
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
                connect: {
                    personId: user2.personId
                }
            }
        }
    });
});

describe('companies', () => {
    it('get not owned user companies', async () => {
        const companies = await caller.companies(1);

        expect(companies).toStrictEqual([
            {
                NIF: '87654321B',
                name: 'Owned SL',
                address: 'Calle en Propiedad, Bajo',
                id: 2,
                ownerId: 1
            }
        ]);
    });

    it('get user owned companies', async () => {
        const companies = await caller.userCompanies();

        expect(companies).toStrictEqual([
            {
                NIF: '12345678A',
                address: 'Calle Asd, Bajo',
                id: 1,
                name: 'ASD SL',
                ownerId: null
            },
            {
                NIF: '87654321B',
                name: 'Owned SL',
                address: 'Calle en Propiedad, Bajo',
                id: 2,
                ownerId: 1
            }
        ]);
    });

    it('get specific company', async () => {
        const company = await caller.company(1);

        expect(company).toStrictEqual({
            NIF: '12345678A',
            name: 'ASD SL',
            address: 'Calle Asd, Bajo',
            id: 1,
            ownerId: null
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
            address: 'no',
            ownerCompany: null
        });

        expect(company).toStrictEqual({
            id: 4,
            NIF: '13243546D',
            name: 'Compañía SL',
            address: 'no',
            ownerId: null
        });

        const invalidCompany = async () =>
            caller.addCompany({
                NIF: '13243546D',
                name: 'Compañía SL',
                address: 'no',
                ownerCompany: null
            });

        expect(invalidCompany).rejects.toThrowError(
            'this company already exists for this user'
        );
    });

    it('delete a company', async () => {
        expect(await caller.deleteCompany(1)).toStrictEqual({
            NIF: '12345678A',
            name: 'ASD SL',
            address: 'Calle Asd, Bajo',
            id: 1,
            ownerId: null
        });

        expect(async () => caller.deleteCompany(1)).rejects.toThrowError(
            "can't delete a company that does not exists"
        );
    }, 1000000);
});
