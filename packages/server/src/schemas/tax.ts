import { z } from 'zod';

export const TaxSchema = z.object({
    name: z.string().min(1),
    rate: z.number().int().min(0).max(100).default(0)
});

export type TaxType = z.infer<typeof TaxSchema>;
