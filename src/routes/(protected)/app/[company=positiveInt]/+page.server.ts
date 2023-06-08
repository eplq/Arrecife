import prisma from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { companies, user } = await parent();

	const company = companies.find((item) => item.id.toString() === params.company);

	if (!company) throw error(404, 'not found');

	const foundCompany = await prisma.company.findFirst({
		where: {
			users: {
				some: {
					id: user.id
				}
			},
			id: company.id,
			owner: null
		},
		select: {
			id: true,
			name: true,
			NIF: true,
			address: true
		}
	});

	if (!foundCompany) throw error(404, 'not found');

	const companiesCount = await prisma.company.count({
		where: {
			ownerId: foundCompany.id
		}
	});

	const invoicesCount = await prisma.invoice.count({
		where: {
			OR: [
				{
					buyer: {
						id: foundCompany.id
					}
				},
				{
					seller: {
						id: foundCompany.id
					}
				}
			]
		}
	});

	const articlesCount = await prisma.product.count({
		where: {
			brand: {
				provider: {
					company: {
						owner: {
							id: foundCompany.id
						}
					}
				}
			}
		}
	});

	const brandsCount = await prisma.brand.count({
		where: {
			provider: {
				company: {
					owner: {
						id: foundCompany.id
					}
				}
			}
		}
	});

	return {
		currentCompany: foundCompany,
		companiesCount,
		invoicesCount,
		articlesCount,
		brandsCount
	};
}) satisfies PageServerLoad;
