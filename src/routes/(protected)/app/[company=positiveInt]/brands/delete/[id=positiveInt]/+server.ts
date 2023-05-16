import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals: { user } }) => {
	if (!user) return new Response('no user', { status: 401 });
	const { company, id } = params;

	const providerEntity = await prisma.provider.findFirst({
		where: {
			brands: {
				some: {
					id: parseInt(id)
				}
			},
			company: {
				ownerId: parseInt(company)
			}
		}
	});

	if (!providerEntity) return new Response('no company', { status: 400 });

	const brand = await prisma.brand.findFirst({
		where: {
			id: parseInt(id),
			providerId: providerEntity.companyId
		}
	});

	if (!brand) return new Response('no brand', { status: 400 });

	await prisma.brand.delete({
		where: {
			id: brand.id
		}
	});

	throw redirect(302, `/app/${company}/brands`);
};
