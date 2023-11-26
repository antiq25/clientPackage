// app.js
import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { importReviews } from "./handleData.js";
import { PrismaClient } from "@prisma/client";
// import { getFormattedReviews } from "./format.js";
import cors from "cors";
import path from "path";
import verifyToken from './token.js';
import express from "express";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json()); // For parsing application/json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptDirectory = path.join(__dirname, "../scrapes");
const port = 3002;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

const prisma = new PrismaClient();

/* ***************************  C O L L E C T  ***************************************************/
// ----------------------------  D A T A    ----------------------------------------------------//
app.post("/scrape/collect-reviews", async (req, res) => {
  try {
    const { companyNames, companyLocations } = req.body;

    let queries = [];
    if (
      companyNames &&
      companyLocations &&
      companyNames.length === companyLocations.length
    ) {
      queries = companyNames.map(
        (name, index) => `"${name} in ${companyLocations[index]}"`
      );
    } else {
      return res.status(400).json({
        message: "Invalid input: Mismatched company names and locations",
      });
    }

    // DO NOT PRETTIER THIS LINE
    const pythonProcess = spawn(
      "python",
      [
        "-c",
        `from src.gmaps import Gmaps; Gmaps.places(${JSON.stringify(
          queries
        )}, scrape_reviews=True, reviews_max=100, reviews_sort=Gmaps.HIGHEST_RATING)`,
      ],
      { cwd: scriptDirectory }
    );

    let data = "";
    pythonProcess.stdout.on("data", (chunk) => {
      data += chunk.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return res
          .status(500)
          .json({ message: "Failed to run the Python script", exitCode: code });
      }
      res
        .status(200)
        .json({ message: "Python script executed successfully", data: data });
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/* ***************************   INJECT  ***************************************************/
// ---------------------------	 DATA   ------------------------------------------------------//
app.post("/scrape/import-reviews", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id.toString(); // Assuming verifyToken middleware adds user object to req
    const filePath = path.join(
      __dirname,
      "../scrapes/output/all/json/places.json"
    );
    const result = await importReviews(filePath, userId);
    res.status(200).json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error importing data", error: error.message });
  }
});


app.get("/scrape/reviews", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id.toString(); // Convert userId to a string
    const reviews = await prisma.detailedReview.findMany({
      where: {
        business: {
          userId: userId,
        },
      },
      include: {
        business: true,
      },
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


app.get("/scrape/get-reviews", verifyToken, async (req, res) => {
  try {
    // Assuming verifyToken middleware adds user info to req.user
    const userId = String(req.user.id); // Convert the user ID to a string
    const formattedReviews = await getFormattedReviews(userId); // Pass the string user ID to the function
    res.status(200).json(formattedReviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving reviews", error: error.message });
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
