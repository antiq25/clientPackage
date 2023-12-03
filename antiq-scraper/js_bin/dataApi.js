// import { getFormattedReviews } from "./format.js";
import express from "express";
import scraperRouter from "./src/scraperRoutes.js";
import cors from 'cors'
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()
const prefix = '/scrape'
const port = 3002

app.use(express.json()); // For parsing application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);


app.use(`${prefix}`, scraperRouter);
app.use(scraperRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
