import bcryptjs from 'bcryptjs';

const { genSalt, hash } = bcryptjs; // commonjs hack for building with vite

const SALT_ROUNDS = 10;

export default async function generateHash(string: string, salt?: string) {
	return hash(string, salt ?? (await genSalt(SALT_ROUNDS)));
}
