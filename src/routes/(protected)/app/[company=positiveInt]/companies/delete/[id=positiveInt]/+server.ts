import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals: { user } }) => {
	if (!user) return new Response('no user');

	const { id, company } = params;

	const companyEntity = await prisma.company.findFirst({
		where: { id: parseInt(id) }
	});

	if (!companyEntity) return new Response('no company');

	await prisma.company.delete({
		where: { id: companyEntity.id }
	});

	throw redirect(302, `/app/${company}/companies`);
};
