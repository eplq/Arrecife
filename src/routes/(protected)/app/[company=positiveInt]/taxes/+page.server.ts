import prisma from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { currentCompany } = await parent();

	const taxes = await prisma.tax.findMany({
		where: {
			companyId: currentCompany?.id
		},
		orderBy: {
			name: 'asc'
		}
	});

	return { taxes };
}) satisfies PageServerLoad;
