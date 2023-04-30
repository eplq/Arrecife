import prisma from '$lib/server/prisma';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { user } = await parent();

	const companies = await prisma.company.findMany({
		where: {
			users: {
				some: {
					id: user.id
				}
			}
		},
		select: {
			name: true,
			id: true
		}
	});

	return {
		user,
		companies
	};
};
