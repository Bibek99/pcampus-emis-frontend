import { AddUserIcon } from '@app/elements/icons';
import { TableView } from '@app/layout';
import { useGetStudents } from '@app/services/user.service';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Middle Name',
    accessor: 'middle_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Batch',
    accessor: 'batch',
  },
  {
    Header: 'Department',
    accessor: 'department_s',
  },
  {
    Header: 'Section',
    accessor: 'section',
  },
];

export const StudentsView: React.FC = () => {
  const { data, isLoading } = useGetStudents();
  const [students, setStudents] = useState<any[]>([]);

  const normalizeStudentData = () => {
    let normalizedStudentData: any[] = [];
    data?.data.map((student: any, index: number) => {
      normalizedStudentData[index] = {
        batch: student?.batch.name,
        section: student?.section.name,
        ...student?.student,
        department_s: student?.department.name,
      };
    });
    setStudents(normalizedStudentData);
    console.log(normalizedStudentData);
  };

  useEffect(() => {
    normalizeStudentData();
  }, [data]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Students</h1>
        <Link
          to="add"
          className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
        >
          <span>
            <AddUserIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Add Student</span>
        </Link>
      </div>
      <hr className="border border-gray-300" />
      <div className="flex flex-col space-y-4">
        <TableView exportOption tableData={students} columnData={columns} />
      </div>
    </div>
  );
};
