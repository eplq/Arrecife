import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { currentCompany } = await parent();

	const brands = await prisma.brand.findMany({
		where: {
			provider: {
				company: {
					owner: {
						id: currentCompany?.id
					}
				}
			}
		}
	});

	return { brands };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const code = formData.get('code');
		const internalCode = formData.get('internal_code');
		const cost = formData.get('cost');
		const price = formData.get('price');
		const brand = formData.get('brand');

		if (!name || typeof name !== 'string') {
			return fail(400, { code, internalCode, cost, price, brand, nameMissing: true });
		}

		if (!code || typeof code !== 'string') {
			return fail(400, { name, internalCode, cost, price, brand, codeMissing: true });
		}

		if (!internalCode || typeof internalCode !== 'string') {
			return fail(400, { name, code, cost, price, brand, internalCodeMissing: true });
		}

		if (!price || typeof price !== 'string') {
			return fail(400, { name, code, internalCode, cost, brand, priceMissing: true });
		}

		if (cost && typeof cost !== 'string') {
			return fail(400, { name, code, internalCode, price, brand });
		}

		if (!brand || typeof brand !== 'string') {
			return fail(400, { name, code, internalCode, cost, price, brandMissing: true });
		}

		const priceInt = parseFloat(price) * 100;
		const costInt = cost ? parseFloat(cost) * 100 : null;

		const brandId = parseInt(brand);

		const brandEntity = await prisma.brand.findFirst({
			where: {
				id: brandId
			}
		});

		if (!brandEntity) {
			return fail(400, { name, code, internalCode, cost, price, brand, brandMissing: true });
		}

		await prisma.product.create({
			data: {
				name,
				code,
				internal_code: internalCode,
				cost: costInt,
				price: priceInt,
				brand: { connect: { id: brandEntity.id } }
			}
		});

		const { company } = params;

		throw redirect(301, `/app/${company}/articles`);
	}
};
