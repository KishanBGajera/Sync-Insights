import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import generateRandomColors from '../../utils/generateRandomColors';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, labels, width, height }) => {
    const {backgroundColor, borderColor} = generateRandomColors(data.length);


    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 1,
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
                text: 'Pie Chart',
            },
        },
    };

    return (
        <div style={{ width, height }}>
            <Pie data={chartData} options={options} />
        </div>
    );
};

export default PieChart;
