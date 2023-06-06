import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ locals: { user }, params, request }) => {
		if (!user) {
			return fail(401);
		}

		const company = await prisma.company.findFirst({
			where: {
				id: parseInt(params.company),
				users: {
					some: {
						id: user?.id
					}
				}
			}
		});

		if (!company) {
			return fail(404);
		}

		const formData = await request.formData();
		const name = formData.get('name');

		if (!name || typeof name !== 'string') {
			return fail(400);
		}

		const payments: {
			days: number;
			percentage: number;
		}[] = [];

		let exists = true;
		for (let i = 0; exists; i++) {
			const rawDays = formData.get(`payment_days_${i}`);
			const rawPercentage = formData.get(`payment_percentage_${i}`);

			if (
				!rawDays ||
				!rawPercentage ||
				typeof rawDays !== 'string' ||
				typeof rawPercentage !== 'string'
			) {
				exists = false;
				continue;
			}

			const days = parseInt(rawDays, 10);
			const percentage = parseFloat(rawPercentage);

			if (isNaN(days) || isNaN(percentage)) {
				exists = false;
				continue;
			}

			payments.push({ days, percentage });
		}

		console.log(name);
		console.log(payments);

		await prisma.$transaction(async (tx) => {
			const newPaymentPlan = await tx.paymentPlan.create({
				data: {
					name: name,
					company: {
						connect: {
							id: company.id
						}
					}
				}
			});

			for (const { days, percentage } of payments) {
				await tx.paymentPlanPayment.create({
					data: {
						days,
						percentage,
						paymentPlan: {
							connect: {
								id: newPaymentPlan.id
							}
						}
					}
				});
			}
		});

		throw redirect(302, `/app/${params.company}/paymentPlans`);
	}
};
