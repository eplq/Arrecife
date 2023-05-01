import prisma from '$lib/server/prisma';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent, params }) => {
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

	let currentCompany = null;
	if (params.company) {
		currentCompany = await prisma.company.findFirst({
			where: {
				users: {
					some: {
						id: user.id
					}
				},
				id: Number(params.company),
				owner: null
			},
			select: {
				id: true,
				name: true,
				NIF: true,
				address: true
			}
		});
	}

	return {
		user,
		companies,
		currentCompany
	};
};
