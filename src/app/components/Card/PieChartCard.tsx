import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartCardProps {
  title: string;
  data: any;
}

export const PieChartCard: React.FC<PieChartCardProps> = ({ title, data }) => {
  return (
    <div className="flex flex-col space-y-4 rounded-lg bg-gray-50 p-6">
      <h4 className="text-lg font-medium">{title}</h4>
      <hr className="border-gray-300" />
      <Doughnut data={data as any} />
    </div>
  );
};
