import axios from 'axios';
import { useQuery } from 'react-query';
import api from './api';
import { authHeader } from './authheader';

export const useGlobalStudentCalendar = (
  userId?: string,
  monthId?: number,
  yearId?: number
) => {
  const { data, ...rest } = useQuery(['global-student-calendar', userId], () =>
    api.get(
      `assignment/show/all/class/specific/student/${userId || ''}/${
        monthId || ''
      }/${yearId || ''}/`,
      {
        headers: authHeader(),
      }
    )
  );

  const calendarData = data?.data;
  return { calendarData, ...rest };
};
