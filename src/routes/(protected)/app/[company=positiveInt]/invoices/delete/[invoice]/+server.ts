import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { user }, params }) => {
	if (!user) return new Response('no user', { status: 401 });

	const { company, invoice } = params;

	const companyEntity = await prisma.company.findFirst({
		where: { id: parseInt(company), users: { some: { id: user?.id } } }
	});

	if (!companyEntity) return new Response('no company', { status: 404 });

	const invoiceEntity = await prisma.invoice.findFirst({
		where: {
			id: parseInt(invoice),
			OR: [{ seller: { id: companyEntity.id } }, { buyer: { id: companyEntity.id } }]
		}
	});

	if (!invoiceEntity) return new Response('no invoice', { status: 404 });

	await prisma.invoice.delete({
		where: { id: invoiceEntity.id }
	});

	throw redirect(302, `/app/${company}/invoices`);
};
