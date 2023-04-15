import { z } from 'zod';

import { CompanySchema } from './company';
import { PaymentPlanSchema } from './paymentPlan';

export const ProviderSchema = CompanySchema.extend({
    generalInvoiceDiscount: z.number().min(0).max(100),
    preferredPaymentPlan: PaymentPlanSchema.nullable()
});

export type ProviderType = z.infer<typeof ProviderSchema>;
