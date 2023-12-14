import { readFileSync } from 'fs';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const insertIntoDatabase = async (data, model) => {
  try {
    for (const item of data) {
      await prisma[model].upsert({
        where: { id: item.id },
        update: {},
        create: item,
      });
    }
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data into database:', error);
    throw error;
  }
};


export const readJsonData = (filePath) => {
  try {
    const jsonData = readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
};


export const transformBusinessData = (rawData) => {
  return rawData.map(data => ({
    placeId: data.place_id,
    name: data.name,
    description: data.description,
    // ... other fields
  }));
};

export const transformReviewData = (rawData) => {
  return rawData.map(data => ({
    reviewId: data.review_id,
    reviewerName: data.reviewer_name,
    // ... other fields
  }));
};
