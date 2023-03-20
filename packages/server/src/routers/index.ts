import { router } from '../trpc';
import companyRouter from './company';

export default router({
    company: companyRouter
});
