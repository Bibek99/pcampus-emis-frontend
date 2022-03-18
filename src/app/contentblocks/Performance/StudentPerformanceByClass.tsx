import { useAuthContext } from '@app/auth/AuthContext';
import { GreenSpinner } from '@app/components';
import { PieChartCard } from '@app/components/Card';
import { TableView } from '@app/layout';
import {
  useFetchClass,
  useFetchStudentPerformanceReportForAClass,
  useFetchStudentsInAClass,
} from '@app/services';
import { ChevronRightIcon } from '@heroicons/react/outline';
import { avatarSVG } from '@utils/avatarSVG';
import classNames from 'classnames';
import Image from 'next/image';
import React, { useState } from 'react';
import ReactSelect from 'react-select';

export const StudentPerformanceByClass = () => {
  const { authenticatedUser, role } = useAuthContext();

  const [classId, setClassId] = useState<any>(null);
  const [className, setClassName] = useState<any>(null);
  const [studentObj, setStudentObj] = useState<any>(null);

  const { classData, isLoading } = useFetchClass(
    role,
    String(authenticatedUser?.id)
  );

  const { students } = useFetchStudentsInAClass(classId, {
    enabled: typeof classId == 'number' ? true : false,
  });

  const { performanceReport } = useFetchStudentPerformanceReportForAClass(
    classId,
    studentObj?.student.id,
    {
      enabled: typeof studentObj?.id == 'number' ? true : false,
    }
  );

  const assignmentData = performanceReport?.assignments?.map(
    (singleAssignment: any, index: number) => {
      return {
        id: index + 1,
        title: singleAssignment.assignment.title,
        grade: `${
          (singleAssignment.obtain_points /
            singleAssignment.assignment.total_points) *
          100
        }%`,
      };
    }
  );

  const column = [
    {
      Header: 'ID',
      accessor: 'id',
    },
    {
      Header: 'Assignment Title',
      accessor: 'title',
    },
    {
      Header: 'Grade Obtained',
      accessor: 'grade',
    },
  ];

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
                  ...((classData &&
                    classData.map((classItem: any) => {
                      return {
                        label: classItem.name,
                        value: classItem.id,
                      };
                    })) ||
                    []),
                ]}
                onChange={(option: any) => {
                  setClassId(option.value);
                  setClassName(option.label);
                  setStudentObj(null);
                }}
              />
            </div>
            {students && (
              <div className="flex flex-col space-y-6 pt-8">
                <span className="text-sm italic text-gray-600">
                  Showing students for class {className}
                </span>
                <div className="h-[500px] space-y-6 overflow-y-auto">
                  {students?.map((student: any, index: any) => (
                    <div
                      key={index}
                      className={classNames(
                        'group flex cursor-pointer items-center justify-between rounded-md p-2',
                        studentObj?.id === student.id
                          ? 'bg-emerald-500 text-white'
                          : 'hover:bg-emerald-50'
                      )}
                      onClick={() => setStudentObj(student)}
                    >
                      <div>
                        <h4 className="font-semibold">{student.full_name}</h4>
                        <span
                          className={classNames(
                            studentObj?.id === student.id
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
                          studentObj?.id === student.id
                            ? 'group-hover:text-white'
                            : 'group-hover:text-emerald-500'
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-2 md:pl-4">
            {studentObj && (
              <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-6 p-6 md:flex-row md:justify-between md:space-y-0">
                  <div className="flex items-center space-x-6">
                    <div>
                      <Image
                        src={avatarSVG(studentObj?.full_name)}
                        height={96}
                        width={96}
                        className="rounded-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold uppercase">
                        {studentObj?.full_name}
                      </h3>
                      <p className="text-gray-600">{studentObj?.rollno}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-600">Overall Grade</h3>
                    <p
                      className={classNames(
                        'text-3xl font-semibold md:text-right',
                        performanceReport?.performance_points < 32
                          ? 'text-red-500'
                          : 'text-emerald-500'
                      )}
                    >
                      {performanceReport?.performance_points}%
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 rounded-md border shadow-md lg:col-span-1">
                    <PieChartCard
                      title="Attendance"
                      data={{
                        labels: ['Present', 'Absent'],
                        datasets: [
                          {
                            label: ['Present', 'Absent'],
                            data: [
                              (performanceReport?.present_days /
                                performanceReport?.total_working_days) *
                                100,
                              ((performanceReport?.total_working_days -
                                performanceReport?.present_days) /
                                performanceReport?.total_working_days) *
                                100,
                            ],
                            backgroundColor: ['#34d399', '#f87171'],
                            borderColor: ['#34d399', '#f87171'],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      options={{
                        plugins: {
                          tooltip: {
                            callbacks: {
                              label: (context: any) => {
                                let label = context.label || '';
                                label +=
                                  ': ' +
                                  context.dataset.data[context.dataIndex] +
                                  '%';

                                return label;
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="col-span-3 flex flex-col space-y-4 border p-6 shadow-md lg:col-span-2">
                    <h4 className="text-lg font-medium">Assignments</h4>
                    <hr className="border-gray-300" />
                    {assignmentData && (
                      <TableView
                        columnData={column}
                        tableData={assignmentData}
                        exportOption={false}
                        searchOption={false}
                        paginationOption={false}
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
