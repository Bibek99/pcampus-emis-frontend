import React from 'react';
import { colors, randomColor } from '@utils/colors';

export const SimpleCard = () => {
  return (
    <div className="flex h-64 flex-col items-center justify-center space-y-4 rounded-md border border-gray-300 p-4 text-center shadow-sm hover:shadow-md">
      <span
        style={{ backgroundColor: randomColor(colors) }}
        className="flex items-center justify-center bg-red-500 p-4 font-semibold uppercase text-white"
      >
        BCT
      </span>
      <h4 className="font-semibold uppercase">Computer Department</h4>
    </div>
  );
};
