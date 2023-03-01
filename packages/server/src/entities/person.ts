import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { z } from 'zod';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id!: number; // we ensure that a value will be given

    @Column({
        length: 30
    })
    name!: string;

    @Column({
        length: 60
    })
    surnames!: string;
}

export const PersonSchema = z.object({
    name: z.string(),
    surnames: z.string()
});

export type PersonType = z.infer<typeof PersonSchema>;
