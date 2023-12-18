import React, { createContext, useContext, useState, useEffect } from 'react';
import { useApi } from 'src/api/providers/ApiProvider';

const ReviewsContext = createContext();

export const useReviews = () => useContext(ReviewsContext);
export const useBusinessNames = () => useContext(ReviewsContext);

export const ReviewsDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { crawl } = useApi();
  const [reviews, setReviews] = useState([]);
  const [businessNames, setBusinessNames] = useState([]);

  const provideReview = async () => {
    setIsLoading(true);
    try {
      const response = await crawl.reviews();
      setReviews(response.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const provideBusiness = async () => {
    setIsLoading(true);
    try {
      const response = await crawl.businesses();
      setBusinessNames(response.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    provideReview();
    provideBusiness();
  }, []);

  return (
    <ReviewsContext.Provider value={{ reviews, businessNames, isLoading, error }}>
      {children}
    </ReviewsContext.Provider>
  );
};
