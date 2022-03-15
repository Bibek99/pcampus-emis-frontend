import { useAuthContext } from '@app/auth/AuthContext';
import { GreenSpinner } from '@app/components';
import { SimpleCard } from '@app/components/Card';
import { RoleBasedRenderer } from '@app/router/guards';
import { useDeleteClass, useFetchClass } from '@app/services';
import { PlusIcon, TrashIcon } from '@heroicons/react/outline';
import React from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ClassList = () => {
  const { role } = useAuthContext();
  const { authenticatedUser } = useAuthContext();
  const userId = String(authenticatedUser?.id);
  const { classData, isLoading } = useFetchClass(role, userId);

  const queryClient = useQueryClient();

  const { mutate: deleteClass } = useDeleteClass({
    onError: () => {
      toast.error('Error deleting class');
    },
    onSuccess: () => {
      toast.success('Class deleted successfully');
      queryClient.invalidateQueries('fetch-classes');
    },
  });

  const showButton = () => {
    if (role === 'ADMIN' || role === 'DEPT_ADMIN') {
      return true;
    }
    return false;
  };

  if (isLoading) {
    return (
      <div className="flex min-h-full w-full items-center justify-center">
        <GreenSpinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col space-y-6 p-6">
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
          <div key={index} className="group relative">
            <Link to={`${classobj.alias}-${classobj.id}`}>
              <SimpleCard data={classobj} />
            </Link>
            <RoleBasedRenderer allowRoles={['DEPT_ADMIN']}>
              <button
                onClick={() => deleteClass(classobj?.id)}
                className="absolute -top-4 -right-4 z-[20] hidden rounded-full bg-gray-50 p-4 shadow-sm hover:text-red-500 group-hover:block"
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </RoleBasedRenderer>
          </div>
        ))}
      </div>
    </div>
  );
};
