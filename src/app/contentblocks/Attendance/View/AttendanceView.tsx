import { useAuthContext } from '@app/auth/AuthContext';
import { AddUserIcon } from '@app/elements/icons';
import { ColumnFilter, TableView } from '@app/layout';
import { useGetStudents } from '@app/services/user.service';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useFetchStudentsInAClass } from '@app/services';
import { useFetchAttendanceForAStudent, useFetchAttendanceForStudentsInAClass } from '@app/services/attendance.service';

const columns = [
  {
    Header: 'Image',
    accessor: 'images',
    Cell: ({ row }: { row: any }) => {
      return row.values.images ? (
        <Image
          src={`http://localhost:8000${row.values.images}`}
          height={48}
          width={48}
          className="rounded-full"
        />
      ) : (
        <span></span>
      );
    },
    disableFilters: true
  },
  {
    Header: 'Roll no.',
    accessor: 'rollno',

  },
  {
    Header: 'Name',
    accessor: 'full_name',

  },
  {
    Header: 'Present Days',
    accessor: 'present',

  },
  {
    Header: 'Total Days',
    accessor: 'total',

  },
  {
    Header: 'Present %',
    accessor: 'percent',

  },
];

export const AttendanceView: React.FC = () => {
  const { id } = useParams();
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);
  const { students, isLoading } = useFetchStudentsInAClass(id);
  console.log("students", students);

  // console.log();
  // const stdd = 23;
  // console.log("test", "useFetchAttendanceForAStudent(id, String(stdd))");


  const presentDaysList = useFetchAttendanceForStudentsInAClass(students, id);
  //   console.log("student.id", student.id);
  //   const { attendance } = useFetchAttendanceForAStudent(id, String(student.id))
  //   return attendance?.student_present_days;
  // })
  // console.log("presentDaysList", presentDaysList);

  const studentAttendanceViewList = students?.map(
    (student: any, index: any) =>
    ({
      ...student,
      present: presentDaysList[index],
      total: '4',
      percent: presentDaysList[index] / 4 * 100,
    })
  )

  if (isLoading) {
    return <h1>Loading</h1>;
  }
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-center">
        </div>
        <TableView pagesize={48} exportOption tableData={studentAttendanceViewList} columnData={columns} />

      </div>
    </div >
  );
};
