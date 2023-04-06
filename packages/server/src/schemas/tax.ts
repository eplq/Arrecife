import { z } from 'zod';

export const TaxSchema = z.object({
    name: z.string().min(1),
    rate: z.number().min(0).max(1).default(0)
});

export type TaxType = z.infer<typeof TaxSchema>;
