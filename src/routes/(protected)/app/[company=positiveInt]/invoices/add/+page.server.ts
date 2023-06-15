import prisma from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user }, parent }) => {
	const { currentCompany } = await parent();

	const companies = await prisma.company.findMany({
		where: {
			owner: {
				id: currentCompany?.id,
				users: {
					some: {
						id: user?.id
					}
				}
			}
		}
	});

	const paymentPlans = await prisma.paymentPlan.findMany({
		where: {
			company: {
				id: currentCompany?.id,
				users: {
					some: {
						id: user?.id
					}
				}
			}
		},
		include: {
			payments: true
		}
	});

	const taxes = await prisma.tax.findMany({
		where: {
			company: {
				id: currentCompany?.id,
				users: {
					some: {
						id: user?.id
					}
				}
			}
		}
	});

	return {
		companies,
		paymentPlans,
		taxes
	};
};
