import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { usePageView } from '../hooks/use-page-view';

import { format, parseISO } from 'date-fns';

const RatingsGraph = ({ reviews }) => {
  const [chartData, setChartData] = useState([]);
  usePageView();

  useEffect(() => {
    const ratingsByDate = {};

if (Array.isArray(reviews)) {
    reviews.forEach((review) => {
      // Check if review.published_at_date is a valid date string
      if (review.published_at_date && !isNaN(Date.parse(review.published_at_date))) {
        const date = format(parseISO(review.published_at_date), 'yyyy-MM-dd');
        if (!ratingsByDate[date]) {
          ratingsByDate[date] = { date, totalRating: 0, count: 0 };
        }
        ratingsByDate[date].totalRating += review.rating;
        ratingsByDate[date].count += 1;
      }
      });
    }

    const formattedData = Object.values(ratingsByDate).map((item) => ({
      date: item.date,
      averageRating: (item.totalRating / item.count).toFixed(2),
    }));

    setChartData(formattedData);
  }, [reviews]);

  return (
    <ResponsiveContainer
      width="100%"
      height={400}
    >
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="averageRating"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RatingsGraph;
