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

    // personId: 2
    await prisma.contact.create({
        data: {
            role: 'Administrador',
            person: {
                create: {
                    name: 'Julio',
                    surnames: 'Iglesias',
                    emails: {
                        create: {
                            email: 'julio.iglesias@arrecife'
                        }
                    },
                    phones: {
                        create: {
                            phone: '611111111'
                        }
                    }
                }
            },
            company: {
                connect: {
                    id: contactsCompany.id
                }
            }
        }
    });

    // personId: 3
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

    // personId: 4
    const user2 = await prisma.user.create({
        data: {
            email: 'dsa@dsa.com',
            password: 'dsa',
            person: {
                create: { name: 'dsa', surnames: 'dsa' }
            }
        }
    });

    // id: 4
    const company2 = await prisma.company.create({
        data: {
            NIF: '12348765B',
            name: 'Company2 SL',
            address: 'Calle Asd, Bajo',
            users: {
                connect: {
                    personId: user2.personId
                }
            }
        }
    });

    // personId: 5
    await prisma.contact.create({
        data: {
            role: 'Dueño',
            person: {
                create: { name: 'Pepe', surnames: 'Blanco' }
            },
            company: {
                connect: {
                    id: company2.id
                }
            }
        }
    });
});

describe('contacts tests', () => {
    it('get contact', async () => {
        const contact = await caller.contact({
            contact: 2,
            company: 3
        });

        expect(contact).toStrictEqual({
            role: 'Administrador',
            name: 'Julio',
            surnames: 'Iglesias',
            id: 2,
            emails: ['julio.iglesias@arrecife'],
            phones: ['611111111']
        });

        const existentContactWrongCompany = await caller.contact({
            contact: 3,
            company: 3
        });

        expect(existentContactWrongCompany).toBeNull();

        const companyOfOtherUser = await caller.contact({
            company: 4,
            contact: 5
        });

        expect(companyOfOtherUser).toBeNull();
    });

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

    it('modify contact', async () => {
        const onlyName = await caller.updateContact({
            company: 3,
            person: 2,
            name: 'Víctor Manuel'
        });

        const onlyNameRecordDB = await prisma.contact.findFirst({
            where: {
                companyId: 3,
                personId: 2
            },
            include: {
                person: {}
            }
        });

        expect(onlyNameRecordDB?.person.name).toBe('Víctor Manuel');
        expect(onlyNameRecordDB?.person.surnames).toBe('Iglesias');
        expect(onlyNameRecordDB?.role).toBe('Administrador');
        expect(onlyName).toBeTruthy();

        const onlySurnames = await caller.updateContact({
            company: 3,
            person: 2,
            surnames: 'San José'
        });

        const onlySurnamesRecordDB = await prisma.contact.findFirst({
            where: {
                companyId: 3,
                personId: 2
            },
            include: {
                person: {}
            }
        });

        expect(onlySurnamesRecordDB?.person.name).toBe('Víctor Manuel');
        expect(onlySurnamesRecordDB?.person.surnames).toBe('San José');
        expect(onlySurnamesRecordDB?.role).toBe('Administrador');
        expect(onlySurnames).toBeTruthy();

        expect(onlyNameRecordDB?.person.name).toBe('Víctor Manuel');
        expect(onlyNameRecordDB?.person.surnames).toBe('Iglesias');
        expect(onlyNameRecordDB?.role).toBe('Administrador');
        expect(onlyName).toBeTruthy();

        const onlyRole = await caller.updateContact({
            company: 3,
            person: 2,
            role: 'Gestor'
        });

        const onlyRoleRecordDB = await prisma.contact.findFirst({
            where: {
                companyId: 3,
                personId: 2
            },
            include: {
                person: {}
            }
        });

        expect(onlyRoleRecordDB?.person.name).toBe('Víctor Manuel');
        expect(onlyRoleRecordDB?.person.surnames).toBe('San José');
        expect(onlyRoleRecordDB?.role).toBe('Gestor');
        expect(onlyRole).toBeTruthy();

        const updated = await caller.updateContact({
            company: 3,
            person: 2,
            name: 'Pablo',
            surnames: 'Milanés',
            role: 'Contable'
        });

        const updatedRecordDB = await prisma.contact.findFirst({
            where: {
                companyId: 3,
                personId: 2
            },
            include: {
                person: {}
            }
        });

        expect(updatedRecordDB?.person.name).toBe('Pablo');
        expect(updatedRecordDB?.person.surnames).toBe('Milanés');
        expect(updatedRecordDB?.role).toBe('Contable');
        expect(updated).toBeTruthy();
    });

    it('delete contact', async () => {
        const deleted = await caller.deleteContact({
            company: 3,
            person: 2
        });

        expect(deleted).toBeTruthy();

        const inexistentContact = await caller.deleteContact({
            company: 3,
            person: 2
        });

        expect(inexistentContact).toBeFalsy();

        const inexistentCompany = await caller.deleteContact({
            company: 99,
            person: 3
        });

        expect(inexistentCompany).toBeFalsy();

        const otherUserContact = await caller.deleteContact({
            company: 4,
            person: 5
        });

        expect(otherUserContact).toBeFalsy();
    });

    it('create contact', async () => {
        const result = await caller.createContact({
            name: 'Luz',
            surnames: 'Casal',
            role: 'Administradora',
            emails: ['luz.casal@contacts'],
            phones: ['611611611'],
            company: 3
        });

        expect(result).toBeTruthy();

        const repeatedResult = await caller.createContact({
            name: 'Luz',
            surnames: 'Casal',
            role: 'Administradora',
            emails: ['luz.casal@contacts'],
            phones: ['611611611'],
            company: 3
        });

        expect(repeatedResult).toBeFalsy();

        const otherCompanyResult = await caller.createContact({
            name: 'Luz',
            surnames: 'Casal',
            role: 'Administradora',
            emails: ['luz.casal@contacts'],
            phones: ['611611611'],
            company: 4
        });

        expect(otherCompanyResult).toBeFalsy();

        const inexistentCompanyResult = await caller.createContact({
            name: 'Luz',
            surnames: 'Casal',
            role: 'Administradora',
            emails: ['luz.casal@contacts'],
            phones: ['611611611'],
            company: 99
        });

        expect(inexistentCompanyResult).toBeFalsy();
    });
});