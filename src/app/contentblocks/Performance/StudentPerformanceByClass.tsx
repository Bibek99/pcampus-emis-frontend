import { useAuthContext } from '@app/auth/AuthContext';
import { GreenSpinner } from '@app/components';
import {
  useFetchClass,
  useFetchStudentPerformanceReportForAClass,
  useFetchStudentsInAClass,
} from '@app/services';
import { ChevronRightIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React, { useState } from 'react';
import ReactSelect from 'react-select';

export const StudentPerformanceByClass = () => {
  const { authenticatedUser, role } = useAuthContext();

  const [classId, setClassId] = useState<any>(null);
  const [className, setClassName] = useState<any>(null);
  const [studentId, setStudentId] = useState<any>(null);

  console.log('studentId', studentId);

  const { classData, isLoading } = useFetchClass(
    role,
    String(authenticatedUser?.id)
  );

  const { students } = useFetchStudentsInAClass(classId, {
    enabled: typeof classId == 'number' ? true : false,
  });
  console.log(students);

  const { performanceReport } = useFetchStudentPerformanceReportForAClass(
    classId,
    studentId,
    {
      enabled: typeof studentId == 'number' ? true : false,
    }
  );
  console.log(performanceReport);

  if (isLoading) {
    <div className="flex h-full w-full items-center justify-center">
      <GreenSpinner className="h-12 w-12" />
    </div>;
  }

  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Students Performance</h1>
      </div>
      <hr className="border border-gray-300" />
      <div className="flex-grow">
        <section className="grid h-full grid-cols-1 gap-4 md:grid-cols-3 md:divide-x-2 md:divide-dashed md:divide-gray-300">
          <div className="md:col-span-1">
            <div>
              <label htmlFor="classes">
                Select Class <span className="text-red-500">*</span>
              </label>
              <ReactSelect
                className="mt-2"
                placeholder="Select Class"
                options={[
                  ...classData.map((classItem: any) => {
                    return {
                      label: classItem.name,
                      value: classItem.id,
                    };
                  }),
                ]}
                onChange={(option: any) => {
                  setClassId(option.value);
                  setClassName(option.label);
                  setStudentId(null);
                }}
              />
            </div>
            {students && (
              <div className="flex flex-col space-y-6 pt-8">
                <span className="text-sm italic text-gray-600">
                  Showing students for class {className}
                </span>
                {students?.map((student: any, index: any) => (
                  <div
                    key={index}
                    className={classNames(
                      'group flex cursor-pointer items-center justify-between rounded-md p-2',
                      studentId === student.id
                        ? 'bg-emerald-500 text-white'
                        : 'hover:bg-emerald-50'
                    )}
                    onClick={() => setStudentId(student.id)}
                  >
                    <div>
                      <h4 className="font-semibold">{student.full_name}</h4>
                      <span
                        className={classNames(
                          studentId === student.id
                            ? 'text-white'
                            : 'text-gray-500'
                        )}
                      >
                        {student.rollno}
                      </span>
                    </div>
                    <ChevronRightIcon
                      className={classNames(
                        'hidden h-4 w-4 group-hover:block',
                        studentId === student.id
                          ? 'group-hover:text-white'
                          : 'group-hover:text-emerald-500'
                      )}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:col-span-2 md:pl-2">{studentId}</div>
        </section>
      </div>
    </div>
  );
};
