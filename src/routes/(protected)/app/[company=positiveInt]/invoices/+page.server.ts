import prisma from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals: { user } }) => {
	const { currentCompany } = await parent();

	const invoices = await prisma.invoice.findMany({
		where: {
			OR: [
				{
					seller: {
						id: currentCompany?.id,
						ownerId: null,
						users: {
							some: {
								id: user?.id
							}
						}
					}
				},
				{
					buyer: {
						id: currentCompany?.id,
						ownerId: null,
						users: {
							some: {
								id: user?.id
							}
						}
					}
				}
			]
		},
		orderBy: {
			date: 'desc'
		},
		include: {
			seller: true,
			buyer: true
		}
	});

	return { invoices };
};
