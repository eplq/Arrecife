import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ params: { company: currentCompany }, request, locals: { user } }) => {
		const formData = await request.formData();

		const name = formData.get('name');
		const rateString = formData.get('rate');

		if (!name || typeof name !== 'string' || !rateString || typeof rateString !== 'string')
			return fail(400, { missingData: true });

		const rate = parseFloat(rateString);

		if (rate < 0 || rate > 100) return fail(400, { name, outOfRange: true });

		const company = await prisma.company.findFirst({
			where: {
				id: parseInt(currentCompany),
				users: {
					some: {
						id: user?.id
					}
				}
			}
		});

		if (!company) return fail(400);

		await prisma.tax.create({
			data: {
				name,
				rate,
				company: {
					connect: {
						id: company.id
					}
				}
			}
		});

		throw redirect(302, `/app/${currentCompany}/taxes`);
	}
};
