import express from 'express';
import { Router } from "express";
// Require controller modules.
import * as jobs_controller from '../controllers/jobs.controller';

const jobsRouter = Router();

/// JOB ROUTES ///

// GET catalog home page.
jobsRouter.post('/jobs/addEditJob', jobs_controller.add_edit_job);

export default jobsRouter;
