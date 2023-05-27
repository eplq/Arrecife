import prisma from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { currentCompany } = await parent();

	const articles = await prisma.product.findMany({
		where: {
			brand: {
				provider: {
					company: {
						owner: {
							id: currentCompany?.id
						}
					}
				}
			}
		},
		include: {
			brand: true
		}
	});

	return { articles };
};
