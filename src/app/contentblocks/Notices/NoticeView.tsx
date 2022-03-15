import { useAuthContext } from '@app/auth/AuthContext';
import { RoleBasedRenderer } from '@app/router/guards/RoleBasedRenderer';
import { useFetchAllGlobalNotice, useGlobalNoticeDelete } from '@app/services';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import moment from 'moment';
import React from 'react';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export const NoticeView = () => {
  const { authenticatedUser } = useAuthContext();
  const { globalNotices } = useFetchAllGlobalNotice();

  const queryClient = useQueryClient();

  const { mutate: deleteGlobalNotice } = useGlobalNoticeDelete({
    onError: () => {
      toast.error('Error deleting notice');
    },
    onSuccess: () => {
      toast.success('Notice deleted successfully');
      queryClient.invalidateQueries(['globalNotice']);
    },
  });

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Notices</h1>
        <RoleBasedRenderer allowRoles={['ADMIN']}>
          <Link
            to="create"
            className="flex items-center justify-center space-x-2 rounded-md bg-emerald-500 px-4 py-2 text-white"
          >
            <span>
              <PencilAltIcon className="h-4 w-4" />
            </span>
            <span className="hidden sm:block">Create Notice</span>
          </Link>
        </RoleBasedRenderer>
      </div>
      <hr className="border border-gray-300" />
      <div className="flex flex-col space-y-6 divide-y-2">
        {globalNotices?.map((notice: any, index: number) => (
          <div className="flex items-start justify-between pt-4" key={index}>
            <div>
              <h3 className="pb-2 text-lg font-semibold">{notice?.title}</h3>
              <p>
                <span className="text-sm italic text-gray-500">
                  {moment(notice?.created_at).format('ll')} by
                </span>
                {notice?.publish_by?.admin && (
                  <span className="ml-2 rounded-full bg-green-100 py-1 px-2 text-xs capitalize text-green-700">
                    Admin
                  </span>
                )}
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <Link
                to={`${notice.id}`}
                className="cursor-pointer text-blue-500"
              >
                View Details
              </Link>
              {notice?.publish_by?.id === authenticatedUser?.id && (
                <button
                  onClick={() => deleteGlobalNotice(notice?.id)}
                  className="flex justify-end pt-4 text-gray-500 hover:text-red-500"
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
