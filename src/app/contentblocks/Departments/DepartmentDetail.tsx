import React from 'react';
import { useParams } from 'react-router-dom';
import {
  useFetchDepartmentAdminsByAlias,
  useFetchDepartmentByAlias,
} from '@app/services/department.service';
import classNames from 'classnames';

export const DepartmentDetail = () => {
  const { alias } = useParams();

  const { departmentData } = useFetchDepartmentByAlias(alias);
  console.log(departmentData);

  const { departmentAdminsData } = useFetchDepartmentAdminsByAlias(alias);
  console.log(departmentAdminsData);

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">{departmentData?.name}</h1>
      </div>
      <hr className="border border-gray-300" />
      <div className="grid grid-cols-1 gap-6 pb-6 xl:grid-cols-3 xl:divide-x-2">
        <section className="col-span-2 flex flex-col space-y-8 xl:py-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Department Details</h3>
            <p className="text-gray-800"></p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Name</h3>
            <p className="text-gray-800">{departmentData?.name}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Department Code</h3>
            <p className="text-gray-800">{departmentData?.alias}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Description</h3>
            <p className="text-gray-800">{departmentData?.description}</p>
          </div>
          <hr className="border border-gray-300 xl:hidden" />
        </section>

        <section className="flex flex-col space-y-8 xl:py-6 xl:pl-4">
          <div className="space-y-6">
            <h3 className="font-semibold">Department Admin(s)</h3>
            <div className="divide-y-2">
              {departmentAdminsData?.map((deptAdmin: any, index: number) => (
                <div
                  key={index}
                  className={classNames(index === 0 ? '' : 'pt-4', 'mb-4')}
                >
                  <p>
                    {deptAdmin?.dept_admin.first_name}{' '}
                    {deptAdmin?.dept_admin.middle_name}
                    {deptAdmin?.dept_admin.last_name}
                  </p>
                  <span className="text-xs italic text-gray-500">
                    {deptAdmin?.dept_admin.email}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
