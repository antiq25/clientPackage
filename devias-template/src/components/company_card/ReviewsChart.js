import React from 'react';
import { useEffect } from 'react';
import { useReviews, useBusinessNames } from 'src/components/company_card/ReviewsDataProvider';
import { Bar } from 'react-chartjs-2';
import fetchReviews from './fetchReview';

const ReviewsChart = () => {
  const reviews = fetchReviews();


useEffect (() => {
  fetchReviews();
}
, []);  

  // Process the reviews data to fit the chart format
  const chartData = {
    labels: reviews.map(review => review.businessName), // Replace 'businessName' with the actual property name
    datasets: [
      {
        label: 'Number of Reviews',
        data: reviews.map(review => review.count), // Replace 'count' with the actual property name
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

const ReviewsList = () => {

  return (
    <div>
      {reviews.map(review => (
        <div key={review.id}> {/* Replace 'id' with the actual property name */}
          <h3>{review.businessName}</h3> {/* Replace 'businessName' with the actual property name */}
          <p>{review.text}</p> {/* Replace 'text' with the actual property name */}
          {/* Add more details as needed */}
        </div>
      ))}
    </div>
  );
};

export { ReviewsChart, ReviewsList };
