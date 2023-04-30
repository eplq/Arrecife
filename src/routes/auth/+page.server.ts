import { env } from '$env/dynamic/private';
import { login, registerUser } from '$lib/server/auth/actions';
import prisma from '$lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions = {
	login: async ({ locals, request, cookies }) => {
		if (locals.user) {
			throw redirect(302, '/app');
		}

		const formData = await request.formData();

		const email = formData.get('email');
		const password = formData.get('password');

		if (!email || !password || !(typeof email === 'string') || !(typeof password === 'string'))
			return fail(400);

		const token = await login(email, password, prisma);

		if (!token) return fail(400);

		cookies.set(env.SESSION_COOKIE_NAME, token, {
			secure: import.meta.env.PROD
		});

		throw redirect(302, '/app');
	},
	register: async ({ locals, request, cookies }) => {
		if (locals.user) {
			throw redirect(302, '/app');
		}

		const formData = await request.formData();

		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');

		if (
			!name ||
			!email ||
			!password ||
			!(typeof name === 'string') ||
			!(typeof email === 'string') ||
			!(typeof password === 'string')
		)
			return fail(400);

		const result = await registerUser(
			{
				name,
				email,
				password
			},
			prisma
		);

		if (!result) return fail(400);

		throw redirect(302, '/auth/login');
	}
} satisfies Actions;
