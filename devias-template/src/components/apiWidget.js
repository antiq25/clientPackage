import axios from 'axios';

const baseURL = 'http://localhost:3000/api/v1/pixel'; // Replace with your actual base URL

// Log a view activity
export const logView = async () => {
  try {
    const response = await axios.post(`${baseURL}/log-view`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Log a click activity
export const logClick = async () => {
  try {
    const response = await axios.post(`${baseURL}/log-click`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// Get the view count
export const getViewCount = async () => {
  try {
    const response = await axios.get(`${baseURL}/view-count`);
    return response.data.viewCount;
  } catch (error) {
    console.error(error);
  }
};

// Get the click count
export const getClickCount = async () => {
  try {
    const response = await axios.get(`${baseURL}/click-count`);
    return response.data.clickCount;
  } catch (error) {
    console.error(error);
  }
};
