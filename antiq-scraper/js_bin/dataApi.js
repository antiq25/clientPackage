// app.js
import express from "express";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { importReviews } from "./handleData.js";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

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
				(name, index) => `"${name} in ${companyLocations[index]}"`,
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
								queries,
							)}, scrape_reviews=True, reviews_max=100, reviews_sort=Gmaps.HIGHEST_RATING)`,
						],
						{ cwd: scriptDirectory },
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
app.post("/scrape/import-reviews", async (req, res) => {
	try {
		const filePath = path.join(
			__dirname,
			"../scrapes/output/all/json/places.json",
		);
		const result = await importReviews(filePath);
		res.status(200).json(result);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error importing data", error: error.message });
	}
});



app.get("/scrape/reviews", async (req, res) => {
  try {
    const reviews = await prisma.review.findMany(); // Retrieve all reviews from the database
    res.status(200).json(reviews); // Send reviews as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});



app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});




