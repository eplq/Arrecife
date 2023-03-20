import authedProcedure from '../procedures/authedProcedure';
import { router } from '../trpc';

const companyRouter = router({
    companies: authedProcedure.query(() => '')
});

export default companyRouter;
