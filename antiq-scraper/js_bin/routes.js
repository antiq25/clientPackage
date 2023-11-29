import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { spawn } from "child_process";
import { verifyToken } from "./token";
import { importReviews } from "./handleData";
import { fileURLToPath } from "url";
import { getFormattedReviews } from "./format";
import path from "path";

const prisma = new PrismaClient();
const scraperRouter = new Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptDirectory = path.join(__dirname, "../scrapes");

/* ***************************  C O L L E C T  ***************************************************/
// ----------------------------  D A T A    ----------------------------------------------------//
scraperRouter.post("/collect-reviews", async (req, res) => {
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
scraperRouter.post("/import-reviews", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id.toString();
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

// ## TO DO :: COMBINE THESE APIS
scraperRouter.get("/reviews", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id.toString();
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

scraperRouter.get("/get-reviews", verifyToken, async (req, res) => {
  try {
    const userId = String(req.user.id);
    const formattedReviews = await getFormattedReviews(userId);
    res.status(200).json(formattedReviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving reviews", error: error.message });
  }
});

export default scraperRouter;
