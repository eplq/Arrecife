import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, locals: { user } }) => {
	if (!user) return new Response('no user', { status: 401 });

	const { company, id } = params;

	const companyEntity = await prisma.company.findFirst({
		where: {
			id: parseInt(company),
			users: {
				some: {
					id: user?.id
				}
			}
		}
	});

	if (!companyEntity) return new Response('no company', { status: 400 });

	const paymentPlan = await prisma.paymentPlan.findFirst({
		where: {
			id: parseInt(id),
			company: {
				users: {
					some: {
						id: user?.id
					}
				}
			}
		}
	});

	if (!paymentPlan) return new Response('no payment plan', { status: 400 });

	await prisma.paymentPlan.delete({
		where: {
			id: paymentPlan.id
		}
	});

	throw redirect(302, `/app/${company}/paymentPlans`);
};
