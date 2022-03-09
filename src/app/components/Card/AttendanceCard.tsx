import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface AttendanceCardProps {
  title: string;
  data?: any;
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Attendance',
      data: [6, 5, 2, 4, 5, 6, 8],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Total Class Days',
      data: labels.map(() => 8),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const AttendanceCard: React.FC<AttendanceCardProps> = ({ title }) => {
  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-gray-50 p-6">
      <h4 className="text-lg font-medium">{title}</h4>
      <hr className="border-gray-300" />
      <div className="p-8">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};
