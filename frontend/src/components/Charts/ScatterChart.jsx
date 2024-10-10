import { Scatter } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const ScatterChart = ({ data, backgroundColor, width, height }) => {
    const chartData = {
        datasets: [
            {
                label: 'Scatter Dataset',
                data: data.map(({ x, y }) => ({ x, y })),
                backgroundColor: backgroundColor,
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
                text: 'Scatter Chart',
            },
        },
    };

    return (
        <div style={{ width, height }}>
            <Scatter data={chartData} options={options} />
        </div>
    );
};

export default ScatterChart;
