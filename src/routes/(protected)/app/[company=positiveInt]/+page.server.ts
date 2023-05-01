import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load = (async ({ params, parent }) => {
	const { companies } = await parent();

	const company = companies.find((item) => item.id.toString() === params.company);

	if (company) {
		return {};
	}

	throw error(404, 'not found');
}) satisfies PageServerLoad;
