import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals: { user } }) => {
	if (!user) return new Response('no user', { status: 401 });

	const { company, article } = params;

	const companyEntity = await prisma.company.findFirst({
		where: {
			id: parseInt(company)
		}
	});

	if (!companyEntity) return new Response('no company', { status: 404 });

	const articleEntity = await prisma.product.findFirst({
		where: {
			code: article,
			brand: {
				provider: {
					company: {
						ownerId: companyEntity.id
					}
				}
			}
		}
	});

	if (!articleEntity) return new Response('no article', { status: 404 });

	await prisma.product.delete({
		where: {
			code: articleEntity.code
		}
	});

	throw redirect(302, `/app/${company}/articles`);
};
