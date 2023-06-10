import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params }) => {
	const { currentCompany } = await parent();
	const { article: articleParam } = params;

	const brands = await prisma.brand.findMany({
		where: {
			provider: {
				company: {
					ownerId: currentCompany?.id
				}
			}
		}
	});

	if (!brands.length) return fail(400);

	const article = await prisma.product.findFirst({
		where: {
			code: articleParam,
			brand: {
				id: {
					in: brands.map((brand) => brand.id)
				}
			}
		}
	});

	if (!article) return fail(400);

	return { brands, article };
};

export const actions: Actions = {
	default: async ({ request, params, locals: { user } }) => {
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

		const { company, article } = params;

		const articleEntity = await prisma.product.findFirst({
			where: {
				code: article,
				brand: {
					provider: {
						company: {
							owner: {
								users: {
									some: {
										id: user?.id
									}
								}
							}
						}
					}
				}
			}
		});

		if (!articleEntity) {
			return fail(400, {
				name,
				code,
				internalCode,
				cost,
				price,
				brand,
				article,
				articleMissing: true
			});
		}

		await prisma.product.update({
			where: {
				code: articleEntity.code
			},
			data: {
				name,
				code,
				internal_code: internalCode,
				cost: Math.round(costInt!),
				price: Math.round(priceInt!),
				brand: { connect: { id: brandEntity.id } }
			}
		});

		throw redirect(301, `/app/${company}/articles`);
	}
};
