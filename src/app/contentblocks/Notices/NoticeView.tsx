import { RoleBasedRenderer } from '@app/router/guards/RoleBasedRenderer';
import { useFetchAllGlobalNotice } from '@app/services';
import { PencilAltIcon } from '@heroicons/react/outline';
import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

export const NoticeView = () => {
  const { globalNotices } = useFetchAllGlobalNotice();

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-semibold">Notices</h1>
        <RoleBasedRenderer allowRoles={['ADMIN', 'DEPT_ADMIN']}>
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
        {globalNotices?.map((notice: any) => (
          <div
            className="flex items-start justify-between pt-4"
            key={notice.id}
          >
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
            <Link to={`${notice.id}`} className="cursor-pointer text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
