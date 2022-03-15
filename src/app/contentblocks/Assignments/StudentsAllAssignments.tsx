import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AssignmentDetails } from '.';
import { AssignmentsList } from '.';

export const StudentsAllAssignments = () => {
  return (
    <div className="min-h-full bg-gray-50">
      <Routes>
        <Route path="/" element={<AssignmentsList />} />
        <Route path=":assignmentId" element={<AssignmentDetails />} />
      </Routes>
    </div>
  );
};
