import { Router } from "express";
import DatabaseHandler from "./pixel.service.js"; // Update the import path as needed
import verifyToken from "../util/token.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const pixelRouter = Router();

pixelRouter.post("/log-view", async (req, res) => {
  try {
    const { userId, businessId } = req.body;
    if (!userId || !businessId) {
      return res
        .status(400)
        .json({ message: "User ID and Business ID are required" });
    }
    const dbHandler = new DatabaseHandler(userId, businessId);
    const newViewCount = await dbHandler.incrementViewCount();
    res.status(200).json({ viewCount: newViewCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging view", error: error.message });
  }
});

pixelRouter.post("/log-click", async (req, res) => {
  try {
    const { userId, businessId } = req.body;
    if (!userId || !businessId) {
      return res
        .status(400)
        .json({ message: "User ID and Business ID are required" });
    }
    const dbHandler = new DatabaseHandler(userId, businessId);
    const newClickCount = await dbHandler.incrementClickCount();
    res.status(200).json({ clickCount: newClickCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging click", error: error.message });
  }
});

pixelRouter.get("/view-count", async (req, res) => {
  try {
    const { userId, businessId } = req.query; // Now expecting both userId and businessId
    if (!userId || !businessId) {
      return res
        .status(400)
        .json({ message: "User ID and Business ID are required" });
    }
    const dbHandler = new DatabaseHandler(userId, businessId);
    const widgetActivity = await dbHandler.getWidgetActivity();
    res.json({ viewCount: widgetActivity.viewCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving view count", error: error.message });
  }
});

pixelRouter.get("/click-count", async (req, res) => {
  try {
    const { userId, businessId } = req.query; // Now expecting both userId and businessId
    if (!userId || !businessId) {
      return res
        .status(400)
        .json({ message: "User ID and Business ID are required" });
    }
    const dbHandler = new DatabaseHandler(userId, businessId);
    const widgetActivity = await dbHandler.getWidgetActivity();
    res.json({ clickCount: widgetActivity.clickCount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving click count", error: error.message });
  }
});

pixelRouter.post("/create-widget", verifyToken, async (req, res) => {
  try {
    const { userId, businessId, widgetData } = req.body;

    if (!userId || !businessId || !widgetData) {
      return res.status(400).json({
        message: "User ID, Business ID, and Widget Data are required",
      });
    }

    const dbHandler = new DatabaseHandler(String(userId), businessId);
    const newWidget = await dbHandler.createWidget(widgetData);

    res
      .status(200)
      .json({ message: "Widget created successfully", widget: newWidget });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating widget", error: error.message });
  }
});

pixelRouter.get("/widget", verifyToken, async (req, res) => {
  const { userId, businessId } = req.query;

  try {
    const dbHandler = new DatabaseHandler(userId, businessId);
    const widget = await dbHandler.findWidget();

    if (widget) {
      res.json(widget);
    } else {
      res
        .status(404)
        .json({
          message: "Widget not found for the given businessId and userId.",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching the widget.",
        error: error.message,
      });
  }
});

pixelRouter.get("/user-widgets", verifyToken, async (req, res) => {
  // Convert the userId to a string to match the expected type in the Prisma schema
  const userId = String(req.user.id);

  try {
    const widgets = await prisma.widget.findMany({
      where: {
        userId: userId, // Ensure userId is a string
      },
      select: {
        business: true,
        businessId: true,
        settings: true,
        createdAt: true,
        updatedAt: true,
        id: true,
        viewCount: true,
        clickCount: true,
      },
    });
    res.json(widgets);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching the widgets for the user.",
        error: error.message,
      });
  }
});

export default pixelRouter;
