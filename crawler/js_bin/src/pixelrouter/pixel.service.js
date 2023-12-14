import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class DatabaseHandler {
  constructor(userId, businessId) {
    this.userId = userId;
    this.businessId = businessId;
  }
  
  async getWidgetActivity() {
    try {
      const widgetActivity = await prisma.widget.findFirst({
        where: {
          AND: [{ businessId: this.businessId }, { userId: this.userId }],
        },
      });
      return widgetActivity || { viewCount: 0, clickCount: 0 };
    } catch (error) {
      console.error("Failed to get widget activity:", error);
      throw error;
    }
  }

  async incrementViewCount() {
    try {
      const widgetActivity = await this.getWidgetActivity();
      const newViewCount = String(Number(widgetActivity.viewCount) + 1); // Convert to number, increment, convert back to string
      await prisma.widget.update({
        where: { businessId: this.businessId },
        data: { viewCount: newViewCount },
      });
      return newViewCount;
    } catch (error) {
      console.error("Failed to increment view count:", error);
      throw error;
    }
  }

  async incrementClickCount() {
    try {
      const widgetActivity = await this.getWidgetActivity();
      const newClickCount = String(Number(widgetActivity.clickCount) + 1);
      await prisma.widget.update({
        where: { businessId: this.businessId },
        data: { clickCount: newClickCount },
      });
      return newClickCount;
    } catch (error) {
      console.error("Failed to increment click count:", error);
      throw error;
    }
  }

  async removeWidgetActivity() {
    try {
      await prisma.widget.delete({
        where: { businessId: this.businessId },
      });
    } catch (error) {
      console.error("Failed to remove widget activity:", error);
      throw error;
    }
  }

  async createWidget(data) {
    try {
      const newWidget = await prisma.widget.create({
        data: {
          ...data,
          businessId: this.businessId,
          userId: this.userId,
        },
      });
      return newWidget; // Return the newly created widget
    } catch (error) {
      console.error("Failed to create widget:", error);
      throw error;
    }
  }


  async findWidget() {
    try {
      const widget = await prisma.widget.findFirst({
        where: {
          userId: this.userId,
          businessId: this.businessId,
        },
      });
      return widget;
    } catch (error) {
      console.error("Failed to find widget:", error);
      throw error;
    }
  }

  async findAllWidgetsForUser() {
    try {
      const widgets = await prisma.widget.findMany({
        where: {
          userId: this.userId,
        },
      });
      return widgets;
    } catch (error) {
      console.error("Failed to find widgets for user:", error);
      throw error;
    }
  }
}

export default DatabaseHandler;