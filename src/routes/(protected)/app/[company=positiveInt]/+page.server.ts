import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { companies, user } = await parent();

	const company = companies.find((item) => item.id.toString() === params.company);

	let currentCompany = null;
	if (company) {
		currentCompany = await prisma.company.findFirst({
			where: {
				users: {
					some: {
						id: user.id
					}
				},
				id: Number(company.id),
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

	if (currentCompany) {
		return {
			currentCompany
		};
	}

	throw error(404, 'not found');
}) satisfies PageServerLoad;
