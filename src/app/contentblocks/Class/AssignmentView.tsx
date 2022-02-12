import React from 'react';

export const AssignmentItem = () => {
  return (
    <div className="flex space-x-4 pt-4">
      <div>Avatar</div>
      <div>Assignment Details</div>
    </div>
  );
};

export const AssignmentView = () => {
  return (
    <>
      <div className="flex flex-col space-y-6 divide-y-2">
        {[1, 2, 3, 4].map((assignment, index) => (
          <AssignmentItem key={index} />
        ))}
      </div>
    </>
  );
};
