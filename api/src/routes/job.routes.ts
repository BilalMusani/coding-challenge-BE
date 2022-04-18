import { Router } from "express";
// Require controller modules.
import * as jobs_controller from '../controllers/jobs.controller';

const jobsRouter = Router();

/// JOB ROUTES ///

// GET catalog home page.
jobsRouter.post('/addEditJob', jobs_controller.add_edit_job);
jobsRouter.get('/test', jobs_controller.show_job);

export default jobsRouter;
