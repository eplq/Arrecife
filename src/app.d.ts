// See https://kit.svelte.dev/docs/types#app
import type { User } from '@prisma/client';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: Omit<User, 'password'> | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
