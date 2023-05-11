import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals: { user } }) => {
	if (!user) return new Response('no user', { status: 401 });
	const { company, id } = params;

	const companyEntity = await prisma.company.findFirst({
		where: {
			id: parseInt(company),
			users: {
				some: {
					id: user.id
				}
			},
			owner: null
		}
	});

	if (!companyEntity) return new Response('no company', { status: 400 });

	const tax = await prisma.tax.findFirst({
		where: {
			id: parseInt(id),
			companyId: companyEntity.id
		}
	});

	if (!tax) return new Response('no tax', { status: 400 });

	await prisma.tax.delete({
		where: {
			id: tax.id
		}
	});

	throw redirect(302, `/app/${company}/taxes`);
};
