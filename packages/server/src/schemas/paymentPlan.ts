import { z } from 'zod';

const PaymentPlanPayment = z.object({
    days: z.number().int().nonnegative(),
    percentage: z.number().int().min(0).max(100)
});

const PaymentPlanSchema = z.object({
    name: z.string().min(1),
    payments: z.array(PaymentPlanPayment)
});

export { PaymentPlanSchema };

export type PaymentPlanType = z.infer<typeof PaymentPlanSchema>;
