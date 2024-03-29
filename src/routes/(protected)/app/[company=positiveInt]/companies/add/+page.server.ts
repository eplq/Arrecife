import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { currentCompany } = await parent();

	const paymentPlans = await prisma.paymentPlan.findMany({
		where: {
			companyId: currentCompany?.id
		}
	});

	return {
		paymentPlans
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { user }, params }) => {
		if (!user) return redirect(302, '/');
		if (!params.company) return redirect(302, '/app');

		const formData = await request.formData();

		const name = formData.get('name');
		const nif = formData.get('nif');
		const address = formData.get('address');

		const isProvider = formData.get('isProvider');
		const paymentPlan = formData.get('paymentPlan');
		const generalDiscount = formData.get('generalDiscount');

		if (!name || typeof name !== 'string') {
			return fail(400, { nif, address, nameMissing: true });
		}

		if (!nif || typeof nif !== 'string') {
			return fail(400, { name, address, nifMissing: true });
		}

		if (!address || typeof address !== 'string') {
			return fail(400, { name, nif, addressMissing: true });
		}

		await prisma.$transaction(async (tx) => {
			const newCompany = await tx.company.create({
				data: {
					name,
					NIF: nif,
					address,
					ownerId: parseInt(params.company)
				}
			});

			if (isProvider) {
				const providerParts: {
					paymentPlan: number | undefined;
					generalDiscount: number;
				} = {
					paymentPlan: undefined,
					generalDiscount: 0.0
				};

				if (paymentPlan && typeof paymentPlan === 'string') {
					console.log(paymentPlan);
					const parsedPaymentPlanId = parseInt(paymentPlan);

					let paymentPlanEntity = null;
					if (!isNaN(parsedPaymentPlanId)) {
						paymentPlanEntity = await tx.paymentPlan.findFirst({
							where: {
								id: parsedPaymentPlanId
							}
						});
					}

					if (paymentPlanEntity) providerParts.paymentPlan = paymentPlanEntity.id;
				}

				if (generalDiscount && typeof generalDiscount === 'string') {
					const generalDiscountNumber = parseFloat(generalDiscount);

					if (generalDiscountNumber)
						providerParts.generalDiscount = generalDiscountNumber;
				}

				console.dir(providerParts);

				if (providerParts.paymentPlan) {
					await tx.provider.create({
						data: {
							company: {
								connect: {
									id: newCompany.id
								}
							},
							preferredGeneralDiscount: providerParts.generalDiscount,
							preferredPaymentPlan: {
								connect: {
									id: providerParts.paymentPlan
								}
							}
						}
					});

					return;
				}

				await tx.provider.create({
					data: {
						company: {
							connect: {
								id: newCompany.id
							}
						},
						preferredGeneralDiscount: providerParts.generalDiscount,
						preferredPaymentPlan: undefined
					}
				});
			}
		});

		throw redirect(302, `/app/${params.company}/companies`);
	}
};
