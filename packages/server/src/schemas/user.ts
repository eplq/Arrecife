import { z } from 'zod';

import { PersonSchema } from './person';

export const UserSchema = PersonSchema.extend({
    email: z.string().min(1).email(),
    password: z.string().min(1)
});

export type UserType = z.infer<typeof UserSchema>;
