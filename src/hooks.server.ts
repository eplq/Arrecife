import { env } from '$env/dynamic/private';
import { getSession } from '$lib/server/auth/actions';
import prisma from '$lib/server/prisma';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
	const sessionCookie = event.cookies.get(env.SESSION_COOKIE_NAME);

	event.locals.user = null;
	if (sessionCookie) {
		const user = await getSession(sessionCookie, prisma);
		event.locals.user = user;
	}

	if (!event.locals.user) event.cookies.delete(env.SESSION_COOKIE_NAME);

	const response = await resolve(event);

	return response;
}) satisfies Handle;
