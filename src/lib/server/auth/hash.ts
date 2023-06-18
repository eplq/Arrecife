import { genSalt, hash } from 'bcryptjs';

const SALT_ROUNDS = 10;

export default async function generateHash(string: string, salt?: string) {
	return hash(string, salt ?? (await genSalt(SALT_ROUNDS)));
}
