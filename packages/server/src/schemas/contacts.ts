import { z } from 'zod';

export const ContactSchema = z.object({
    name: z.string().min(1),
    surnames: z.string().min(1),
    role: z.string().min(1),
    emails: z.array(z.string().min(1)),
    phones: z.array(z.string().min(1))
});

export type ContactType = z.infer<typeof ContactSchema>;
