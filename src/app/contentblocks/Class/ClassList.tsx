import { useAuthContext } from '@app/auth/AuthContext';
import { SimpleCard } from '@app/components/Card';
import { useFetchClass } from '@app/services';
import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link } from 'react-router-dom';

export const ClassList = () => {
  const { role } = useAuthContext();
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);
  const { classData, isLoading } = useFetchClass(role, userId);

  const showButton = () => {
    if (role === 'ADMIN' || role === 'DEPT_ADMIN') {
      return true;
    }
    return false;
  };

  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex flex-col space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Classes</h1>
        {showButton() && (
          <Link
            to="create"
            className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
          >
            <span>
              <PlusIcon className="h-4 w-4" />
            </span>
            <span className="hidden sm:block">Create Class</span>
          </Link>
        )}
      </div>
      <hr className="border border-gray-300" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {classData?.map((classobj: any, index: number) => (
          <Link key={index} to={`${classobj.alias}-${classobj.id}`}>
            <SimpleCard data={classobj} />
          </Link>
        ))}
      </div>
    </div>
  );
};
