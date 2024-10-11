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

const BarChart = ({ data, labels, backgroundColor='rgba(75, 192, 192, 0.6)', borderColor='rgba(75, 192, 192, 1)', width, height }) => {
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
        },
    };

    return (
        <div style={{ width, height }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
