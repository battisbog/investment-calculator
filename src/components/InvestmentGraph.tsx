import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface InvestmentGraphProps {
  years: number[];
  values: number[];
  lowerValues: number[];
  higherValues: number[];
  baseRate: number;
}

const InvestmentGraph: React.FC<InvestmentGraphProps> = ({ 
  years, 
  values, 
  lowerValues, 
  higherValues, 
  baseRate 
}) => {
  const data = {
    labels: years.map(String),
    datasets: [
      {
        label: `Base Rate (${baseRate}%)`,
        data: values.map((v) => v / 1_000_000),
        borderColor: "blue",
        fill: false,
      },
      {
        label: `Lower Rate (${baseRate - 5}%)`,
        data: lowerValues.map((v) => v / 1_000_000),
        borderColor: "red",
        borderDash: [5, 5],
        fill: false,
      },
      {
        label: `Higher Rate (${baseRate + 5}%)`,
        data: higherValues.map((v) => v / 1_000_000),
        borderColor: "green",
        borderDash: [5, 5],
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Investment Growth Over Time with Varying Interest Rates',
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Investment Value (in millions USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default InvestmentGraph;