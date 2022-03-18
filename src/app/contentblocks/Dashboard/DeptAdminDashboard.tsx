import { useAuthContext } from '@app/auth/AuthContext';
import { CustomCalendar } from '@app/components/Calendar';
import { DataCard, PieChartCard } from '@app/components/Card';
import { useFetchAllGlobalNotice } from '@app/services';
import { useDepartmentAdminDashboardService } from '@app/services/dashboard.service';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';
import { Link } from 'react-router-dom';

export const DeptAdminDashboard = () => {
  const { department } = useAuthContext();
  const { deptDashboardData } = useDepartmentAdminDashboardService(department, {
    enabled: !!department,
  });

  const { globalNotices } = useFetchAllGlobalNotice();
  console.log(globalNotices);

  const { authenticatedUser } = useAuthContext();

  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-semibold">
        Welcome back {authenticatedUser?.first_name} !
      </h1>
      <hr className="border border-gray-300" />
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-9">
          <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link to="/students">
              <DataCard
                title="Students"
                icon={
                  <Image
                    src={'/static/images/student.png'}
                    height={64}
                    width={64}
                  />
                }
                value={deptDashboardData?.students?.total}
              />
            </Link>
            <Link to="/teachers">
              <DataCard
                title="Teachers"
                icon={
                  <Image
                    src={'/static/images/teacher.png'}
                    height={64}
                    width={64}
                  />
                }
                value={deptDashboardData?.teachers?.total}
              />
            </Link>
            <Link to="/classes">
              <DataCard
                title="Classes"
                icon={
                  <Image
                    src={'/static/images/classes.png'}
                    height={64}
                    width={64}
                  />
                }
                value={deptDashboardData?.classes}
              />
            </Link>
          </section>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <PieChartCard
              title="Students"
              data={{
                labels: ['Male', 'Female'],
                datasets: [
                  {
                    label: 'label',
                    data: [
                      deptDashboardData?.students?.male,
                      deptDashboardData?.students?.female,
                    ],
                    backgroundColor: ['#facc15', '#3b82f6'],
                    borderColor: ['#facc15', '#3b82f6'],
                    borderWidth: 1,
                  },
                ],
              }}
            />
            <PieChartCard
              title="Teachers"
              data={{
                labels: ['Male', 'Female'],
                datasets: [
                  {
                    label: 'label',
                    data: [
                      deptDashboardData?.students?.male,
                      deptDashboardData?.students?.female,
                    ],
                    backgroundColor: ['#facc15', '#3b82f6'],
                    borderColor: ['#facc15', '#3b82f6'],
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </section>
        </div>
        <aside className="col-span-3 hidden xl:block">
          <div className="flex flex-col space-y-6">
            <div className="rounded-md bg-gray-50 p-4">
              <div className="flex flex-col space-y-4">
                <h4 className="text-xl font-semibold">Recent Notices</h4>
                <hr className="border border-gray-300" />
                <div className="flex flex-col space-y-6">
                  {globalNotices
                    ?.slice(0, 4)
                    ?.map((notice: any, index: number) => (
                      <Link
                        key={index}
                        to={`/notices/${notice.id}`}
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
