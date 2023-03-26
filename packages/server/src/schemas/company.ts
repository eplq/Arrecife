import { z } from 'zod';

export const CompanySchema = z.object({
    NIF: z.string().min(8),
    name: z.string().min(1),
    address: z.string().min(1)
});

export type CompanyType = z.infer<typeof CompanySchema>;
