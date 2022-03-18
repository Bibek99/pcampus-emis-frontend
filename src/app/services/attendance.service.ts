import {
  useMutation,
  UseMutationOptions,
  useQueries,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import api from './api';
import { authHeader } from './authheader';

export const useCreateAttendance = (
  config: UseMutationOptions<any, any, any>,
  class_id?: string
) => {
  return useMutation(
    (AttendanceData) =>
      api.post(`attendance/create/${class_id || ''}/`, AttendanceData, {
        headers: {
          ...authHeader(),
          // 'Content-Type': 'multipart/form-data; boundary=999999999999',
        },
      }),
    {
      ...config,
    }
  );
};

export const useFetchAllAttendance = () => {
  const { data, ...rest } = useQuery(['attendance'], () =>
    api.get('attendance/list/', {
      headers: authHeader(),
    })
  );
  const Attendance = data?.data;
  return { Attendance, ...rest };
};

export const useFetchAttendanceForAStudent = (
  class_id?: string,
  student_id?: string
) => {
  const { data, ...rest } = useQuery(
    ['attendance-student', class_id, student_id],
    () =>
      api.get(
        `attendance/get/total/present/days/${class_id || ''}/${
          student_id || ''
        }/`,
        {
          headers: authHeader(),
        }
      )
  );
  const attendance = data?.data;
  return { attendance, ...rest };
};

export const useFetchAttendanceForStudentsInAClass = (
  students: any[],
  class_id?: string
) => {
  const userQueries = useQueries(
    students?.map((student) => {
      return {
        queryKey: ['attendance-student', class_id, student.id],
        queryFn: () =>
          api.get(
            `attendance/get/total/present/days/${class_id || ''}/${
              student.id || ''
            }/`,
            {
              headers: authHeader(),
            }
          ),
        // enabled: !!students,
      };
    }) ?? []
  );

  return userQueries.map((data) => data.data?.data.present_days);
};

export const useFetchAttendanceTotalWorkingDays = (class_id?: string) => {
  const { data, ...rest } = useQuery(['total-working-days', class_id], () =>
    api.get(`attendance/get/total/working/days/${class_id}/`, {
      headers: authHeader(),
    })
  );
  const totalWorkingDays = data?.data.total_working_days;
  return { totalWorkingDays, ...rest };
};

export const useFetchStudentAttendance = (studentId?: number) => {
  const { data, ...rest } = useQuery(
    ['attendance-student-all', studentId],
    () =>
      api.get(`attendance/get/student/${studentId || ''}/`, {
        headers: authHeader(),
      })
  );
  const attendance = data?.data;
  return { attendance, ...rest };
};
