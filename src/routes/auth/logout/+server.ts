import { logout } from '$lib/server/auth/actions';
import prisma from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals: { user } }) => {
	if (!user) throw redirect(302, '/');

	const id = user.id;

	await logout(id, prisma);

	throw redirect(302, '/');
};
