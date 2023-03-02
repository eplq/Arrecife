import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { z } from 'zod';

import { User } from './User';

@Entity()
export class Company {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({
        length: 12
    })
    nif!: string;

    @Column()
    address!: string;

    @Column()
    managesIt: boolean = false;

    @ManyToOne(() => User)
    user!: User;
}

export const CompanySchema = z.object({
    name: z.string(),
    nif: z.string().max(12),
    address: z.string()
});

export type CompanyType = z.infer<typeof CompanySchema>;
