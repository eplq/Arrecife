import { PrismaClient } from '@prisma/client';

export default async function resetDB(prisma: PrismaClient) {
    await prisma.userCompany.deleteMany();
    await prisma.company.deleteMany();
    await prisma.userSession.deleteMany();
    await prisma.user.deleteMany();
    await prisma.person.deleteMany();
    await prisma.$queryRaw`ALTER TABLE Person AUTO_INCREMENT = 0`;
    await prisma.$queryRaw`ALTER TABLE Company AUTO_INCREMENT = 0`;
}
