import prisma from '$lib/server/prisma';
import { fail } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

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
