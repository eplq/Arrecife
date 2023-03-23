import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.userCompany.deleteMany();
    await prisma.company.deleteMany();
    await prisma.user.deleteMany();
    await prisma.person.deleteMany();
    await prisma.$queryRaw`ALTER TABLE Person AUTO_INCREMENT = 0`;

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
            address: 'Calle Asd, Bajo'
        }
    });

    await prisma.userCompany.create({
        data: {
            company,
            user,
            managesIt: false
        }
    });
});

describe('companies', () => {
    it('get all user companies', async () => {});
});
