import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data, labels, backgroundColor='rgba(75, 192, 192, 0.6)', borderColor='rgba(75, 192, 192, 1)', width, height }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset',
                data: data,
                fill: false,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Line Chart',
            },
        },
        scales: {
            y: {
              beginAtZero: true, 
              min: 0,
              max: 12
            }
        }
    };

    return (
        <div style={{ width, height }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default LineChart;
