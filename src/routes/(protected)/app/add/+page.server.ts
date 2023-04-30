import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { user } }) => {
		if (!user) throw redirect(302, '/');

		const formData = await request.formData();

		const name = formData.get('name');
		const nif = formData.get('nif');
		const address = formData.get('address');

		if (
			!name ||
			!nif ||
			!address ||
			!(typeof name === 'string') ||
			!(typeof nif === 'string') ||
			!(typeof address === 'string')
		)
			return fail(400);

		const company = await prisma.company.findFirst({
			where: {
				users: {
					some: {
						id: user.id
					}
				},
				NIF: nif,
				owner: null
			}
		});

		if (company) return fail(400, { nif, alreadyExists: true });

		await prisma.company.create({
			data: {
				name,
				address,
				NIF: nif,
				users: {
					connect: {
						id: user.id
					}
				}
			}
		});

		throw redirect(302, '/app');
	}
};
