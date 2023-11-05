import React from 'react';
import ChartComponent from './ChartComponent';

const ChartPage = () => {
  const chartType = 'pie'; // or 'bar', 'doughnut', etc.

  const data = {
    labels: ['Jan', 'Feb'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Reviews',
      },
    },
  };

  return (
    <div>
      <ChartComponent
        type={chartType}
        data={data}
        options={options}
      />
    </div>
  );
};

export default ChartPage;
