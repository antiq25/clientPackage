import { Router } from "express";
import DatabaseHandler from "./pixel.service"; // Update the import path as needed

const pixelRouter = Router();

pixelRouter.post("/log-view", async (req, res) => {
  try {
    const { userId } = req.body;
    const dbHandler = new DatabaseHandler(userId);
    const newViewCount = await dbHandler.incrementViewCount();
    res.status(200).json({ viewCount: newViewCount });
  } catch (error) {
    res.status(500).json({ message: "Error logging view", error: error.message });
  }
});

pixelRouter.post("/log-click", async (req, res) => {
  try {
    const { userId } = req.body;
    const dbHandler = new DatabaseHandler(userId);
    const newClickCount = await dbHandler.incrementClickCount();
    res.status(200).json({ clickCount: newClickCount });
  } catch (error) {
    res.status(500).json({ message: "Error logging click", error: error.message });
  }
});

pixelRouter.get("/view-count", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming the userId is sent as a query parameter
    const dbHandler = new DatabaseHandler(userId);
    const widgetActivity = await dbHandler.getWidgetActivity();
    res.json({ viewCount: widgetActivity.viewCount });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving view count", error: error.message });
  }
});

pixelRouter.get("/click-count", async (req, res) => {
  try {
    const { userId } = req.query; // Assuming the userId is sent as a query parameter
    const dbHandler = new DatabaseHandler(userId);
    const widgetActivity = await dbHandler.getWidgetActivity();
    res.json({ clickCount: widgetActivity.clickCount });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving click count", error: error.message });
  }
});

// Add any other routes that use DatabaseHandler here...

export default pixelRouter;
