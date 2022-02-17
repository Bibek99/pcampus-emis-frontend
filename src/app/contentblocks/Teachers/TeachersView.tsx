import { useAuthContext } from '@app/auth/AuthContext';
import { AddUserIcon } from '@app/elements/icons';
import { TableView } from '@app/layout';
import { useGetTeachers } from '@app/services/user.service';
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
    Header: 'Department',
    accessor: 'department_t',
  },
];

export const TeachersView: React.FC = () => {
  const { data } = useGetTeachers();
  const [teachers, setTeachers] = useState<any[]>([]);

  const normalizeTeacherData = () => {
    let normalizedTeacherData: any[] = [];
    data?.data.map((teacher: any, index: number) => {
      normalizedTeacherData[index] = {
        department_t: teacher?.department.name,
        ...teacher?.teacher,
      };
    });
    setTeachers(normalizedTeacherData);
  };

  useEffect(() => {
    normalizeTeacherData();
  }, [data]);
  const { role } = useAuthContext();
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Teachers</h1>
        {role === 'ADMIN' && (
          <Link
            to="add"
            className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
          >
            <span>
              <AddUserIcon className="h-4 w-4" />
            </span>
            <span className="hidden sm:block">Add Teacher</span>
          </Link>
        )}
      </div>
      <hr className="border border-gray-300" />
      <div className="flex flex-col space-y-4">
        <TableView exportOption tableData={teachers} columnData={columns} />
      </div>
    </div>
  );
};
