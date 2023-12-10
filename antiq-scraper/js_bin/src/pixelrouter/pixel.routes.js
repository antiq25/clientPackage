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



pixelRouter.post("/log-view", verifyToken, async (req, res) => {
  try {
    const { userId, businessId } = req.body;

    // Convert userId and businessId to strings if they are numbers in your system
    const dbHandler = new DatabaseHandler(String(userId), String(businessId));
    const newViewCount = await dbHandler.incrementViewCount();

    res.status(200).json({ viewCount: newViewCount });
  } catch (error) {
    res.status(500).json({
      message: "Error logging view",
      error: error.message,
    });
  }
});

// Click count logging
pixelRouter.post("/log-click", verifyToken, async (req, res) => {
  try {
    const { userId, businessId } = req.body;

    const dbHandler = new DatabaseHandler(String(userId), String(businessId));
    const newClickCount = await dbHandler.incrementClickCount();

    res.status(200).json({ clickCount: newClickCount });
  } catch (error) {
    res.status(500).json({
      message: "Error logging click",
      error: error.message,
    });
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

    // Instead of sending a message and the widget object, just send the widget ID.
    res.status(200).json({ id: newWidget.id });
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
      res.status(404).json({
        message: "Widget not found for the given businessId and userId.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching the widget.",
      error: error.message,
    });
  }
});


pixelRouter.get("/widgets/:widgetId", async (req, res) => {
  const { widgetId } = req.params;

  try {
    // Retrieve the widget data and increment the view count atomically.
    const widgetData = await prisma.widget.update({
      where: { id: widgetId },
      data: {
        viewCount: { increment: 1 },
      },
      include: {
        business: true, // Include the related Business data
      },
    });

    if (!widgetData) {
      return res.status(404).json({ message: "Widget not found." });
    }

    // Construct the widget's HTML content using the widget and business data
    const widgetHtml = `
      <div id="widget-container" style="font-family: Arial, sans-serif; max-width: 300px; border: 1px solid #ddd; border-radius: 8px; padding: 15px; background-color: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h2 id="widget-name" style="color: #333; margin-top: 0;">${
          widgetData.business.name
        }</h2>
        <p id="widget-description" style="color: #666; font-size: 14px;">${
          widgetData.business.description || "Description not available."
        }</p>
        <hr style="border: none; border-bottom: 1px solid #eee;">
        <p id="widget-address" style="color: #666; font-size: 14px;">
          <strong>Address:</strong> ${widgetData.business.address}
        </p>
        <p id="widget-phone" style="color: #666; font-size: 14px;">
          <strong>Phone:</strong> ${widgetData.business.phone}
        </p>
        <p id="widget-website" style="color: #666; font-size: 14px;">
          <strong>Website:</strong> <a href="${
            widgetData.business.website
          }" target="_blank" rel="noopener noreferrer" style="color: #1a0dab; text-decoration: none;">${
            widgetData.business.website
          }</a>
        </p>
        <p id="widget-view-count" style="text-align: center; background: #f7f7f7; color: #333; border-radius: 4px; padding: 4px; margin-top: 8px;">
          View Count: <span>${widgetData.viewCount}</span>
        </p>
        <p id="widget-click-count" style="text-align: center; background: #f7f7f7; color: #333; border-radius: 4px; padding: 4px; margin-top: 4px; margin-bottom: 0;">
          Click Count: <span>${widgetData.clickCount}</span>
        </p>
      </div>
    `;

    // Send the HTML content as the response
    res.send(widgetHtml);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching the widget data.",
        error: error.message,
      });
  }
});


pixelRouter.get("/user-widgets", verifyToken, async (req, res) => {
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
    res.status(500).json({
      message: "An error occurred while fetching the widgets for the user.",
      error: error.message,
    });
  }
});

// Assuming prisma is already imported and configured



pixelRouter.get("/public-widgets/:widgetId", async (req, res) => {
  try {
    const widgetId = req.params.widgetId; // Correctly grabbing the widget ID from the URL

    const widget = await prisma.widget.findUnique({
      where: { id: widgetId }, // Assuming id is the primary key in your schema
      select: {
        id: true,
        viewCount: true,
        clickCount: true,
        settings: true,
      },
    });

    // Check if widget was found
    if (!widget) {
      return res.status(404).json({ message: "Widget not found." });
    }

    // Increment the view count when a public widget is fetched
    await prisma.widget.update({
      where: { id: widgetId },
      data: { viewCount: { increment: 1 } },
    });

    // Respond with public widget data
    res.status(200).json(widget);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error retrieving public widget data",
        error: error.message,
      });
  }
}); 

export default pixelRouter;
