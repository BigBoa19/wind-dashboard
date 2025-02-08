import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import './Dashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';  // Import annotation plugin
import { color } from 'chart.js/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin  // Register the annotation plugin
);

const Dashboard = () => {
  const [data, setData] = useState(null);  // State to store fetched data

  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:5000/api/get_predictions')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data.entries);
      }) // Set data once fetched
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;  // Render loading state until data is fetched
  }

  // Prepare data for the chart using day indices as labels
  const chartData = {
    labels: data.entries.map((entry, index) => index),  // Using index (0, 1, 2, ...) as day labels
    datasets: [
      {
        label: 'Price (Cents/MWh)',
        data: data.entries.map((entry) => entry.Price),  // Assuming Price is always available
        fill: false,
        borderColor: '#00ADB5',  // Accent color for the Price line
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 140,  // y-coordinate of the line
            yMax: 140,  // y-coordinate of the line
            borderColor: 'red',  // Line color
            borderWidth: 2,  // Line thickness
            borderDash: [5, 5],  // Dotted line (5px dash, 5px space)
            label: {
              content: 'y = 140',
              enabled: true,
              position: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            },
          },
          verticalLine: {
            type: 'line',
            xMin: 5.55,  // x position of the line (at day 5.5)
            xMax: 5.55,  // x position of the line (at day 5.5)
            borderColor: 'red',  // Line color
            borderWidth: 2,  // Line thickness
            borderDash: [5, 5],  // Dotted line (5px dash, 5px space)
            label: {
              content: 'Day 5.55',
              enabled: true,
              position: 'top',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            },
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear',  // Use linear scale for x-axis (0, 1, 2, ...)
        grid: { display: false, color: '#444' },
      },
      y: { grid: { display: true, color: '#444' } },
    },
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Energy Management Dashboard</h1>
        <p>Forecasted Prices &amp; Action Recommendations</p>
      </header>

      {/* Container to display the chart and summary side by side */}
      <div className="chart-summary-container">
        <section className="chart-section">
          <Line data={chartData} options={chartOptions} />
        </section>

        <section className="summary-section">
          <h2 style={{ fontSize: "30pt" }} className="friendly-text">Market Forecast Summary</h2>
          <p style={{ color: "red", fontSize: "28pt" }}  className="friendly-text">Sell on day 5</p>
        </section>
      </div>

      {/* Action Recommendations Table */}

      {/* Footer Section */}
      <footer className="dashboard-footer" style={{ textAlign: 'center', marginTop: '30px', padding: '20px' }}>
        <p>Dashboard Created By:</p>
        <p>Chris Singer, Noah Choi, Jacky Huang, Shreyas Nanjanagud</p>
      </footer> 
      <h1>
        WeatherWise
      </h1>
    </div>
  );
};

export default Dashboard;
