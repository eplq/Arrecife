import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { user } }) => {
	const { company, id: brandIdString } = params;

	const brandId = parseInt(brandIdString);
	const brand = await prisma.brand.findFirst({
		where: {
			id: brandId,
			provider: {
				company: {
					ownerId: parseInt(company)
				}
			}
		}
	});

	const providers = await prisma.provider.findMany({
		where: {
			company: {
				owner: {
					users: {
						some: {
							id: user?.id
						}
					}
				}
			}
		},
		include: {
			company: true
		}
	});

	return {
		brand,
		providers
	};
};

export const actions: Actions = {
	default: async ({ request, params, locals: { user } }) => {
		const formData = await request.formData();

		const name = formData.get('name');
		const provider = formData.get('provider');

		if (!name) return fail(400, { name, missingName: true });
		if (typeof name !== 'string') return fail(400, { provider, missingName: true });

		if (!provider) return fail(400, { name, missingProvider: true });
		if (typeof provider !== 'string') return fail(400, { name, missingProvider: true });

		const { company: currentCompany, id } = params;

		const providerId = parseInt(provider);
		if (!providerId) return fail(400, { name, missingProvider: true });

		const providerEntity = await prisma.provider.findFirst({
			where: {
				company: {
					id: providerId,
					owner: {
						id: parseInt(currentCompany),
						users: {
							some: {
								id: user?.id
							}
						}
					}
				}
			}
		});

		if (!providerEntity) return fail(400, { name, missingProvider: true });

		await prisma.brand.update({
			where: {
				id: parseInt(id)
			},
			data: {
				name,
				providerId: providerEntity.companyId
			}
		});

		throw redirect(302, `/app/${currentCompany}/brands`);
	}
};
