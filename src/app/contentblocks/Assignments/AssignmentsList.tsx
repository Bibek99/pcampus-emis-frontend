import { useAuthContext } from '@app/auth/AuthContext';
import { useFetchAllAssignmentsForAStudent } from '@app/services';
import { avatarSVG } from '@utils/avatarSVG';
import classNames from 'classnames';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { Link } from 'react-router-dom';

export const AssignmentsList = () => {
  const { authenticatedUser } = useAuthContext();
  const { assignmentsData } = useFetchAllAssignmentsForAStudent(
    authenticatedUser?.id
  );
  console.log(assignmentsData);

  const today = new Date();

  return (
    <div className="rounded-md bg-gray-50 p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Due Assignments</h1>
        </div>
        <hr className="border border-gray-300" />
        <div className="flex flex-col space-y-6 divide-y-2 divide-gray-200 first:pt-0">
          {assignmentsData?.map((assignment: any, index: number) => (
            <div className="flex w-full justify-between pt-6" key={index}>
              <Link
                to={`/classes/${assignment?.classes.alias}-${assignment?.classes?.id}/assignments/${assignment?.id}`}
                className="flex space-x-4"
              >
                <div>
                  <Image
                    src={avatarSVG(assignment?.classes?.alias)}
                    height={64}
                    width={64}
                  />
                </div>
                <div className="flex flex-col space-y-4">
                  <h4 className="text-lg font-semibold">{assignment?.title}</h4>
                  <p className={classNames('text-sm text-gray-600')}>
                    Due {moment(assignment?.due_date).format('LLL')}
                  </p>
                </div>
                <span className="ml-2 h-6 rounded-full bg-red-100 py-1 px-4 text-xs capitalize text-red-700">
                  {assignment?.classes?.alias}
                </span>
              </Link>

              <span className="text-gray-700">
                {assignment?.total_points} Points
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
