import prisma from '$lib/server/prisma';

import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { currentCompany } = await parent();

	const companies = await prisma.company.findMany({
		where: {
			ownerId: currentCompany?.id
		},
		orderBy: {
			name: 'asc'
		}
	});

	return {
		companies
	};
}) satisfies PageServerLoad;
