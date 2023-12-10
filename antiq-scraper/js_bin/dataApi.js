import express from "express";
import scraperRouter from "./src/scraperRoutes.js";
import pixelRouter from "./src/pixelrouter/pixel.routes.js";
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'
import { fileURLToPath } from 'url';
import path from 'path';
import { dirname } from 'path';

// __dirname is not defined in ES module scope, so we need to create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Serve the static files from the public/js directory

// Other routes and middleware...

dotenv.config()

const app = express()
const prefix = '/scrape'
const port = 3002

app.use('/js', express.static(path.join(__dirname, '..', 'public', 'js')));
app.use(express.json()); // For parsing application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: `${process.env.CLIENT_URL}, ${process.env.WIDGET_URL}`,
    credentials: true,
  })
);

app.use(`${prefix}`, scraperRouter);
app.use(`${prefix}`, pixelRouter);
app.use(scraperRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
