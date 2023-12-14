import { readFileSync } from 'fs';

const readJsonData = (filePath) => {
  try {
    const jsonData = readFileSync(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
};


export default readJsonData;
