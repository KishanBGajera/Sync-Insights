import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, labels, backgroundColor, borderColor, width, height }) => {
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Dataset',
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
                text: 'Bar Chart',
            },
        },
    };

    return (
        <div style={{ width, height }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
