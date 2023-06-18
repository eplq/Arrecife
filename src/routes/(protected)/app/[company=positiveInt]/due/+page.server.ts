import prisma from '$lib/server/prisma';
import { addDays } from '$lib/utils/date';

import type { PageServerLoad } from './$types';

export const load = (async () => {
	const dueDates = await prisma.dueDate.findMany({
		where: {
			date: {
				gte: addDays(-15, new Date())
			}
		},
		orderBy: {
			date: 'asc'
		},
		include: {
			invoice: {
				include: {
					buyer: true,
					seller: true
				}
			}
		}
	});

	return {
		dueDates
	};
}) satisfies PageServerLoad;
