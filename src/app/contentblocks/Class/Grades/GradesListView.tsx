import { useFetchStudentsInAClass } from '@app/services';
import React from 'react';
import { useParams } from 'react-router-dom';

export const GradesListView = () => {
  const { id: classId } = useParams();
  const { students } = useFetchStudentsInAClass(classId);
  console.log(students);

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Grades</h2>
      </div>
      <hr className="border border-gray-300" />
      {students?.map((student: any) => (
        <p key={student?.id}>{student.full_name}</p>
      ))}
    </div>
  );
};
