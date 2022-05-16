import { Router } from "express";
import { JobsController } from "../controllers/jobs.controller";


const jobsRouter = Router();

const jobsController = new JobsController();


jobsRouter.post('/addEditJob', jobsController.addEditJob);

export default jobsRouter;
