import prisma from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, locals: { user } }) => {
	const { currentCompany } = await parent();

	const paymentPlans = await prisma.paymentPlan.findMany({
		where: {
			company: {
				id: currentCompany?.id,
				ownerId: null,
				users: {
					some: {
						id: user?.id
					}
				}
			}
		},
		orderBy: {
			name: 'asc'
		},
		include: {
			_count: {
				select: {
					payments: true
				}
			}
		}
	});

	return { paymentPlans };
};
