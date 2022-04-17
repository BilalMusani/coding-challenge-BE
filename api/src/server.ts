import express from "express";
import bodyParser from "body-parser";
import jobsRouter from './routes/job.routes'

const app = express();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());


app.use('/jobs', jobsRouter);

app.listen(PORT);
