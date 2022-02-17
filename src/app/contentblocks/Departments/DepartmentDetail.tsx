import React from 'react';
import { useParams } from 'react-router-dom';

export const DepartmentDetail = () => {
  const { alias } = useParams();
  return (
    <div>
      <h1 className="text-2xl font-semibold">Department Details</h1>
      <h1 className="text-2xl font-semibold">{alias}</h1>
    </div>
  );
};
