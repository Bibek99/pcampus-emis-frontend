import { useAuthContext } from '@app/auth/AuthContext';
import { CustomCalendar } from '@app/components/Calendar';
import { AttendanceCard, DataCard } from '@app/components/Card';
import { useFetchAllAssignmentsForAStudent } from '@app/services';
import {
  useNotificationsForUser,
  useStudentDashboardService,
} from '@app/services/dashboard.service';
import Image from 'next/image';
import React from 'react';

export const StudentDashboard = () => {
  const { authenticatedUser } = useAuthContext();
  const { studentDashboardData } = useStudentDashboardService(
    authenticatedUser?.id
  );
  const { notifications } = useNotificationsForUser(authenticatedUser?.id);
  const { assignmentsData } = useFetchAllAssignmentsForAStudent(
    authenticatedUser?.id
  );

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
              value={studentDashboardData?.classes}
            />
            <DataCard
              title="Assignments Due"
              icon={
                <Image
                  src={'/static/images/assignment.png'}
                  height={64}
                  width={64}
                />
              }
              value={assignmentsData?.length}
            />
          </section>

          <AttendanceCard title="Attendance" />
        </div>
        <aside className="col-span-3 hidden xl:block">
          <CustomCalendar />
        </aside>
      </section>
    </div>
  );
};
