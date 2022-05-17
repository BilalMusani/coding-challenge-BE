import { Router } from "express";
import { JobsController } from "../controllers/jobs.controller";
import { JobUrls } from "./job.urls";


const jobsRouter = Router();

const jobsController = new JobsController();


jobsRouter.post(JobUrls.ADD_EDIT_JOB_EVENT_ROUTE, jobsController.addEditJob);

export default jobsRouter;
