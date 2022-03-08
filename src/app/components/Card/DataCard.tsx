import React, { ReactNode } from 'react';

interface DataCardProps {
  title: string;
  icon: ReactNode;
  value: string;
}

export const DataCard: React.FC<DataCardProps> = ({ title, value, icon }) => {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-6">
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">{value}</span>
        <span className="">{title}</span>
      </div>
      <div>{icon}</div>
    </div>
  );
};
