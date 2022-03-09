import { useAuthContext } from '@app/auth/AuthContext';
import { CustomCalendar } from '@app/components/Calendar';
import { DataCard, PieChartCard } from '@app/components/Card';
import { useAdminDashboardService } from '@app/services/dashboard.service';
import Image from 'next/image';
import React from 'react';

export const DeptAdminDashboard = () => {
  const { adminDashboardData } = useAdminDashboardService();
  const { authenticatedUser } = useAuthContext();
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-2xl font-semibold">
        Welcome Back {authenticatedUser?.first_name} !
      </h1>
      <hr className="border border-gray-300" />
      <section className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="xl:col-span-9">
          <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <DataCard
              title="Students"
              icon={
                <Image
                  src={'/static/images/student.png'}
                  height={64}
                  width={64}
                />
              }
              value={adminDashboardData?.students}
            />
            <DataCard
              title="Teachers"
              icon={
                <Image
                  src={'/static/images/teacher.png'}
                  height={64}
                  width={64}
                />
              }
              value={adminDashboardData?.teachers}
            />
            <DataCard
              title="Department Admins"
              icon={
                <Image
                  src={'/static/images/dept-admin.png'}
                  height={64}
                  width={64}
                />
              }
              value={adminDashboardData?.department_admins}
            />
          </section>
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <PieChartCard
              title="Students"
              data={{
                labels: ['Male', 'Female'],
                datasets: [
                  {
                    label: 'label',
                    data: [43, 57],
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
                    data: [43, 57],
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
          <CustomCalendar />
        </aside>
      </section>
    </div>
  );
};
