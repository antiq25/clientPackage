import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ReviewsContext = createContext();

export const useReviews = () => useContext(ReviewsContext);
export const useBusinessNames = () => useContext(ReviewsContext);

export const ReviewsDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [businessNames, setBusinessNames] = useState([]);

  // Define the base URL for your API
  const apiBaseURL = 'http://localhost:3002/scrape';

  // Function to fetch reviews
  const handleFetchReviews = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiBaseURL}/reviews`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setReviews(response.data); // Assuming the response data is the array of reviews
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch business names
  const handleFetchBusinessNames = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiBaseURL}/business-names`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setBusinessNames(response.data); // Assuming the response data is the array of business names
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    handleFetchBusinessNames();
    handleFetchReviews();
  }, []);

  return (
    <ReviewsContext.Provider value={{ reviews, businessNames, isLoading, error }}>
      {children}
    </ReviewsContext.Provider>
  );
};
