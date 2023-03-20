import isAuthed from '../middleware/isAuthed';
import { publicProcedure } from '../trpc';

const authedProcedure = publicProcedure.use(isAuthed);

export default authedProcedure;
