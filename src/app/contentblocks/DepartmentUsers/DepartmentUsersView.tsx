import { AddUserIcon } from '@app/elements/icons';
import { ColumnFilter, TableView } from '@app/layout';
import { useGetDepartmentAdmins } from '@app/services';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const columns = [
  {
    Header: 'ID',
    accessor: 'id',
    disableFilters: true
  },
  {
    Header: 'Images',
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
    accessor: 'department_alias',

  },
];

export const DepartmentUsersView = () => {
  const { departmentAdmins } = useGetDepartmentAdmins();
  console.log(departmentAdmins);

  const [deptAdmins, setDeptAdmins] = useState<any[]>([]);

  const normalizeDeptAdminData = () => {
    let normalizedDeptAdminData: any[] = [];
    departmentAdmins?.map((deptAdmin: any, index: number) => {
      normalizedDeptAdminData[index] = {
        ...deptAdmin?.dept_admin,
        department_alias: deptAdmin?.department?.alias,
      };
    });
    setDeptAdmins(normalizedDeptAdminData);
  };

  useEffect(() => {
    normalizeDeptAdminData();
  }, [departmentAdmins]);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Department Admins</h1>
        <Link
          to="add"
          className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
        >
          <span>
            <AddUserIcon className="h-4 w-4" />
          </span>
          <span className="hidden sm:block">Add department admin</span>
        </Link>
      </div>
      <hr className="border border-gray-300" />
      <div className="flex flex-col space-y-4">
        <TableView tableData={deptAdmins} columnData={columns} />
      </div>
    </div>
  );
};
