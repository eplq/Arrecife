import prisma from '$lib/server/prisma';
import { error, fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({
	params: { company: companyId, id },
	locals: { user }
}) => {
	const company = await prisma.company.findFirst({
		where: {
			id: parseInt(companyId),
			users: {
				some: {
					id: user?.id
				}
			}
		}
	});

	if (!company) throw error(404, 'not found');

	const tax = await prisma.tax.findFirst({
		where: {
			id: parseInt(id),
			companyId: company.id
		}
	});

	if (!tax) throw error(404, 'not found');

	return {
		tax
	};
};

export const actions: Actions = {
	default: async ({ params: { company: currentCompany, id }, request, locals: { user } }) => {
		const formData = await request.formData();

		const name = formData.get('name');
		const rateString = formData.get('rate');

		if (!name || typeof name !== 'string' || !rateString || typeof rateString !== 'string')
			return fail(400, { missingData: true });

		const rate = parseInt(rateString);

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

		if (!company) return fail(404);

		const tax = await prisma.tax.findFirst({
			where: {
				id: parseInt(id),
				companyId: company.id
			}
		});

		if (!tax) return fail(404);

		await prisma.tax.update({
			where: {
				id: tax.id
			},
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
