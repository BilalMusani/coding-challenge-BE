import express from "express";
import bodyParser from "body-parser";
import jobsRouter from "./routes/job.routes";
import dotenv from 'dotenv';
import { isOperationalError, logError, logErrorMiddleware, returnError } from './utils/handlers/error.handler';
import cron from 'node-cron';
import { JobsService } from "./services/jobs.service";
import { JobUrls } from "./routes/job.urls";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const jobService = new JobsService();

app.use(bodyParser.json());


app.use(JobUrls.DEFAULT_JOB_ROUTE, jobsRouter);

// schedule cron job to send digest

cron.schedule(process.env.EMAIL_SCHEDULE || '* 18 * * *', () => {
    jobService.sendDigest();
});

app.listen(PORT);


// Add middleware to catch exceptions thrown in the app
app.use(logErrorMiddleware)
app.use(returnError)

// Handle all unmanage promise exceptions by throwing errors to be caught in the subsequent block
process.on('unhandledRejection', error => {
    throw error
})

// Manage all uncaught exceptions
process.on('uncaughtException', error => {
    logError(error)
    if (!isOperationalError(error)) {
        process.exit(1)
    }
})