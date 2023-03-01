import { Column, Entity } from 'typeorm';
import { z } from 'zod';

import { Person, PersonSchema } from './Person';

@Entity()
export class User extends Person {
    @Column()
    email!: string;

    @Column()
    password!: string;
}

export const UserSchema = PersonSchema.extend({
    email: z.string().email(),
    password: z.string()
});

export type UserType = z.infer<typeof UserSchema>;
