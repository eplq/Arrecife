import prisma from '$lib/server/prisma';
import { addDays } from '$lib/utils/date';
import type { Invoice } from '@prisma/client';
import { fail, redirect } from '@sveltejs/kit';

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
	default: async ({ locals: { user }, request, params }) => {
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

		const currentCompanyEntity = await prisma.company.findFirst({
			where: {
				id: parseInt(params.company),
				users: {
					some: {
						id: user.id
					}
				}
			}
		});

		if (!currentCompanyEntity) return fail(400);

		const counterpartEntity = await prisma.company.findFirst({
			where: {
				id: parseInt(counterpart),
				owner: {
					users: {
						some: {
							id: user.id
						}
					}
				}
			}
		});

		if (!counterpartEntity) return fail(400);

		const paymentPlanEntity = await prisma.paymentPlan.findFirst({
			where: {
				id: parseInt(paymentPlan),
				company: {
					users: {
						some: {
							id: user.id
						}
					}
				}
			},
			include: {
				payments: true
			}
		});

		if (!paymentPlanEntity) return fail(400);

		const taxesEntities = await prisma.tax.findMany({
			where: {
				id: {
					in: [...parsedTaxes.map((parsedTax) => parsedTax.value)]
				},
				company: {
					users: {
						some: {
							id: user.id
						}
					}
				}
			}
		});

		const subtotalFloat = parseFloat(subtotal);
		const discountFloat = parseFloat(discount) / 100;
		const netAmount = subtotalFloat * (1 - discountFloat);

		const total =
			netAmount + taxesEntities.reduce((sum, tax) => sum + (netAmount * tax.rate) / 100, 0);

		const dateObject = new Date(date);

		await prisma.$transaction(async (tx) => {
			let newInvoice: Invoice;
			if (type === 'sell') {
				newInvoice = await tx.invoice.create({
					data: {
						number,
						date: dateObject,
						sellerId: currentCompanyEntity.id,
						buyerId: counterpartEntity.id,
						subtotal: parseInt((subtotalFloat * 100).toString()),
						discount: parseInt((discountFloat * 100).toString()),
						netAmount: parseInt((netAmount * 100).toString()),
						total: parseInt((total * 100).toString()),
						paymentPlanId: paymentPlanEntity.id,
						taxes: {
							connect: taxesEntities.map((tax) => {
								return {
									id: tax.id
								};
							})
						}
					}
				});
			} else {
				// type === 'buy'
				newInvoice = await tx.invoice.create({
					data: {
						number,
						date: dateObject,
						sellerId: counterpartEntity.id,
						buyerId: currentCompanyEntity.id,
						subtotal: parseInt((subtotalFloat * 100).toString()),
						discount: parseInt((discountFloat * 100).toString()),
						netAmount: parseInt((netAmount * 100).toString()),
						total: parseInt((total * 100).toString()),
						paymentPlanId: paymentPlanEntity.id,
						taxes: {
							connect: taxesEntities.map((tax) => {
								return {
									id: tax.id
								};
							})
						}
					}
				});
			}

			await tx.dueDate.createMany({
				data: paymentPlanEntity.payments.map((payment) => {
					const paymentDate = addDays(payment.days, dateObject);
					const amount = (payment.percentage / 100) * total;

					return {
						amount: parseInt((amount * 100).toString()),
						date: paymentDate,
						invoiceId: newInvoice.id
					};
				})
			});
		});

		throw redirect(302, `/app/${params.company}/invoices`);
	}
};
