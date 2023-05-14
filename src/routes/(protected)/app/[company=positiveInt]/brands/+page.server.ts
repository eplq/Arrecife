import prisma from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { currentCompany } = await parent();

	const brands = await prisma.brand.findMany({
		where: {
			provider: {
				company: {
					ownerId: currentCompany?.id
				}
			}
		},
		include: {
			provider: {
				include: {
					company: true
				}
			},
			_count: {
				select: {
					products: true
				}
			}
		}
	});

	return { brands };
};
