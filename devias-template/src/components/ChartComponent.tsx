import React from 'react';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

// Chart.js 3.x and later use 'registerables' for registering controllers, elements, scales and plugins
ChartJS.register(...registerables);

// Define a type for the chart types
type ChartType = 'line' | 'bar' | 'doughnut' | 'pie';

// Define an interface for the component's props
interface ChartComponentProps {
  type?: ChartType;
  data: any; // Specify the correct type for your chart data here
  options: any; // Specify the correct type for your chart options here
}

const ChartComponent: React.FC<ChartComponentProps> = ({ type = 'line', data, options }) => {
  // Mapping from chart type to the corresponding chart component
  const chartComponents = {
    line: Line,
    bar: Bar,
    doughnut: Doughnut,
    pie: Pie,
  };

  // Determine the correct chart component based on the 'type' prop
  const ChartComponent = chartComponents[type] ?? Line;

  // Render the selected chart component with data and options
  return (
    <ChartComponent
      data={data}
      options={options}
    />
  );
};

export default ChartComponent;
