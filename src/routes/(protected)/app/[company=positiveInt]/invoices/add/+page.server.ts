import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { user }, parent }) => {
	const { currentCompany } = await parent();

	const companies = await prisma.company.findMany({
		where: {
			owner: {
				id: currentCompany?.id,
				users: {
					some: {
						id: user?.id
					}
				}
			}
		}
	});

	const paymentPlans = await prisma.paymentPlan.findMany({
		where: {
			company: {
				id: currentCompany?.id,
				users: {
					some: {
						id: user?.id
					}
				}
			}
		},
		include: {
			payments: true
		}
	});

	const taxes = await prisma.tax.findMany({
		where: {
			company: {
				id: currentCompany?.id,
				users: {
					some: {
						id: user?.id
					}
				}
			}
		}
	});

	return {
		companies,
		paymentPlans,
		taxes
	};
};

export const actions: Actions = {
	default: async ({ locals: { user }, request }) => {
		if (!user) return fail(401);

		const formData = await request.formData();

		const number = formData.get('number');
		const date = formData.get('date');
		const type = formData.get('type');
		const counterpart = formData.get('counterpart');
		const subtotal = formData.get('subtotal');
		const discount = formData.get('discount');
		const taxes = formData.get('taxes');
		const paymentPlan = formData.get('paymentPlan');

		if (!number || typeof number !== 'string')
			return fail(400, {
				date,
				type,
				counterpart,
				subtotal,
				discount,
				paymentPlan,
				numberMissing: true
			});

		if (!date || typeof date !== 'string')
			return fail(400, {
				number,
				type,
				counterpart,
				subtotal,
				discount,
				paymentPlan,
				dateMissing: true
			});

		if (!type || typeof type !== 'string')
			return fail(400, {
				number,
				date,
				counterpart,
				subtotal,
				discount,
				paymentPlan,
				typeMissing: true
			});

		if (!counterpart || typeof counterpart !== 'string')
			return fail(400, {
				number,
				date,
				type,
				subtotal,
				discount,
				paymentPlan,
				counterPart: true
			});

		if (!subtotal || typeof subtotal !== 'string')
			return fail(400, {
				number,
				date,
				type,
				counterpart,
				discount,
				paymentPlan,
				subtotalMissing: true
			});

		if (!discount || typeof discount !== 'string')
			return fail(400, {
				date,
				type,
				counterpart,
				subtotal,
				discount,
				paymentPlan,
				discountMissing: true
			});

		if (!taxes || typeof taxes !== 'string')
			return fail(400, { date, type, counterpart, subtotal, discount, paymentPlan });

		const parsedTaxes: { index: number; value: number; label: string }[] = JSON.parse(taxes);

		if (!paymentPlan || typeof paymentPlan !== 'string')
			return fail(400, {
				date,
				type,
				counterpart,
				subtotal,
				discount,
				paymentPlan,
				paymentPlanMissing: true
			});

		await prisma.$transaction(async (tx) => {});
	}
};
