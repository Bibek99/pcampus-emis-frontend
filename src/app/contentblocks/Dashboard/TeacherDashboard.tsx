import { useAuthContext } from '@app/auth/AuthContext';
import { CustomCalendar } from '@app/components/Calendar';
import { DataCard, TeacherProfileCard } from '@app/components/Card';
import { useFetchAllDeptNotice, useFetchTeacherProfile } from '@app/services';
import {
  useFetchStudentsForATeacher,
  useTeacherDashboardService,
} from '@app/services/dashboard.service';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { Link } from 'react-router-dom';

export const TeacherDashboard = () => {
  const { authenticatedUser } = useAuthContext();
  const { teacherDashboardData } = useTeacherDashboardService(
    authenticatedUser?.id
  );

  const { teacherProfileData } = useFetchTeacherProfile(authenticatedUser?.id);

  const { deptNotices } = useFetchAllDeptNotice(authenticatedUser?.id);

  const { students } = useFetchStudentsForATeacher(authenticatedUser?.id);

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-semibold">
        Welcome back {authenticatedUser?.first_name} !
      </h1>
      <hr className="border border-gray-300" />
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-9">
          <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <DataCard
              title="Classes"
              icon={
                <Image
                  src={'/static/images/classes.png'}
                  height={64}
                  width={64}
                />
              }
              value={teacherDashboardData?.classes}
            />
            <DataCard
              title="Students"
              icon={
                <Image
                  src={'/static/images/student.png'}
                  height={64}
                  width={64}
                />
              }
              value={students?.students}
            />
          </section>
          <div className="flex flex-col space-y-6">
            <TeacherProfileCard teacherProfileData={teacherProfileData} />
          </div>
        </div>
        <aside className="col-span-3 hidden xl:block">
          <div className="flex flex-col space-y-6">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex flex-col space-y-4">
                <h4 className="text-xl font-semibold">Recent Notices</h4>
                <hr className="border border-gray-300" />
                <div className="flex flex-col space-y-6">
                  {deptNotices
                    ?.slice(0, 4)
                    .map((notice: any, index: number) => (
                      <Link
                        key={index}
                        to={`/notices/dept/${notice.id}`}
                        className="group rounded-md p-2 hover:bg-emerald-50"
                      >
                        <h4 className="font-semibold">{notice?.title}</h4>
                        <span className="text-sm italic text-gray-500">
                          {moment(notice?.created_at).format('LL')}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
            <CustomCalendar />
          </div>
        </aside>
      </section>
    </div>
  );
};
