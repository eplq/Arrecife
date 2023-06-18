import type { PrismaClient, User } from '@prisma/client';
import { compare } from 'bcryptjs';
import isEmail from 'validator/lib/isEmail';

import generateHash from './hash';
import addTime from './time';
import generateToken from './utils';

export async function registerUser(
	userInput: {
		name: string;
		email: string;
		password: string;
	},
	prisma: PrismaClient
) {
	if (!isEmail(userInput.email) || !userInput.name.length || !userInput.password.length)
		return false;

	let user = await prisma.user.findFirst({
		where: {
			email: userInput.email
		}
	});

	if (user) return false;

	user = await prisma.user.create({
		data: {
			email: userInput.email,
			password: await generateHash(userInput.password),
			name: userInput.name
		}
	});

	return user !== null;
}

export async function login(
	email: string,
	password: string,
	prisma: PrismaClient,
	tokenExpiration: number = 86400
): Promise<string | false> {
	if (isEmail(email) === false) return false;
	if (tokenExpiration < 0) return false;

	const user = await prisma.user.findFirst({
		where: {
			email
		}
	});

	if (!user) return false;

	if ((await compare(password, user.password)) === false) return false;

	const session = await prisma.userSession.upsert({
		where: {
			userId: user.id
		},
		create: {
			userId: user.id,
			expires: addTime(tokenExpiration),
			token: generateToken()
		},
		update: {
			expires: addTime(tokenExpiration),
			token: generateToken()
		}
	});

	return session.token;
}

export async function isValidSession(token: string, prisma: PrismaClient) {
	if (!token) return false;

	const session = await prisma.userSession.findFirst({
		where: {
			token
		}
	});

	if (!session) return false;

	return session.expires > new Date();
}

export async function getSession(
	token: string,
	prisma: PrismaClient
): Promise<Omit<User, 'password'> | null> {
	if (!token) return null;

	if (!isValidSession(token, prisma)) return null;

	const session = await prisma.userSession.findFirst({
		where: {
			token
		}
	});

	if (!session) return null;

	const user = await prisma.user.findFirst({
		where: {
			id: session.userId
		}
	});

	if (!user) return null;

	return {
		id: user.id,
		name: user.name,
		email: user.email
	};
}

export async function logout(id: number, prisma: PrismaClient): Promise<void> {
	const session = await prisma.userSession.findFirst({
		where: {
			userId: id
		}
	});

	if (!session) return;

	await prisma.userSession.delete({
		where: {
			userId: session.userId
		}
	});
}
