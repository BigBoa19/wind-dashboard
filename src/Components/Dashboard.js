import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const fakeData = {
    predicted_prices: [50.5, 52.3, 53.1, 55.0, 54.2, 53.8, 52.7],
    action_recommendations: ['Hold', 'Sell', 'Buy', 'Hold', 'Sell', 'Hold', 'Buy'],
    timestamps: [
      '2025-02-08T00:00:00Z',
      '2025-02-09T00:00:00Z',
      '2025-02-10T00:00:00Z',
      '2025-02-11T00:00:00Z',
      '2025-02-12T00:00:00Z',
      '2025-02-13T00:00:00Z',
      '2025-02-14T00:00:00Z',
    ],
    summary_message:
      "Forecast indicates a significant increase in energy prices next week due to rising demand. It is recommended that you increase energy storage now to capitalize on the higher prices.",
  };

  // Prepare data for the chart using daily labels
  const chartData = {
    labels: fakeData.timestamps.map((ts) =>
      new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric' })
    ),
    datasets: [
      {
        label: 'Predicted Price ($/MWh)',
        data: fakeData.predicted_prices,
        fill: false,
        borderColor: '#00ADB5', // Accent color for the line
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false, color: '#444' } },
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
          <h2>Market Forecast Summary</h2>
          <p>{fakeData.summary_message}</p>
        </section>
      </div>
      
      {/* Action Recommendations Table */}
      <section className="table-section">
        <h2>Action Recommendations</h2>
        <table className="recommendations-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {fakeData.timestamps.map((ts, index) => (
              <tr key={index}>
                <td>
                  {new Date(ts).toLocaleDateString([], {
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td>{fakeData.action_recommendations[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Dashboard;
