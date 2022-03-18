import { useAuthContext } from '@app/auth/AuthContext';
import { CustomCalendar } from '@app/components/Calendar';
import { AttendanceCard, DataCard } from '@app/components/Card';
import {
  useFetchAllAssignmentsForAStudent,
  useFetchAllDeptNotice,
  useFetchStudentProfile,
  useFetchClass,
} from '@app/services';
import {
  useFetchAttendanceForAStudent,
  useFetchStudentAttendance,
} from '@app/services/attendance.service';
import { ProfileCard } from '@app/components/Card/ProfileCard';

import {
  useNotificationsForUser,
  useStudentDashboardService,
} from '@app/services/dashboard.service';
import moment from 'moment';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export const StudentDashboard = () => {
  const [classLabels, setClassLabels] = useState(null);
  const [presentDays, setPresentDays] = useState<any[]>([]);
  const [totalDays, setTotalDays] = useState<any[]>([]);

  const { authenticatedUser, role } = useAuthContext();
  const { studentDashboardData } = useStudentDashboardService(
    authenticatedUser?.id
  );
  // const { notifications } = useNotificationsForUser(authenticatedUser?.id);
  const { assignmentsData } = useFetchAllAssignmentsForAStudent(
    authenticatedUser?.id
  );

  const { deptNotices } = useFetchAllDeptNotice(authenticatedUser?.id);

  const { classData } = useFetchClass(role, String(authenticatedUser?.id));

  const { attendance } = useFetchStudentAttendance(authenticatedUser?.id);

  useMemo(() => {
    if (classData) {
      const labels = classData.map((item: any) => item?.alias);
      setClassLabels(labels);
    }
  }, [classData]);

  useMemo(() => {
    if (attendance) {
      const presentDays = attendance?.map(
        (attendanceObj: any) => attendanceObj.present_days
      );
      const totalDays = attendance?.map(
        (attendanceObj: any) => attendanceObj.total_days
      );
      setPresentDays(presentDays);
      setTotalDays(totalDays);
    }
  }, [attendance]);

  const { studentProfileData } = useFetchStudentProfile(
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
                value={studentDashboardData?.classes}
              />
            </Link>
            <Link to="/assignments">
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
            </Link>
          </section>

              <div className="flex flex-col space-y-6">
            <ProfileCard studentProfileData={studentProfileData} />

          <AttendanceCard
            title="Attendance"
            options={{
              responsive: true,
              scales: {
                y: { ticks: { stepSize: 1 } },
              },
              plugins: {
                legend: {
                  position: 'top' as const,
                },
              },
            }}
            data={{
              labels: classLabels,
              datasets: [
                {
                  label: 'Attendance',
                  data: presentDays,
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: 'Total Class Days',
                  data: totalDays,
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
              ],
            }}
          />

      
            
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
