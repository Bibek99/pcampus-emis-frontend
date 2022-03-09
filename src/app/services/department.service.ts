import { useQuery } from 'react-query';
import api from './api';
import { authHeader } from './authheader';

export const useFetchDepartmentByAlias = (alias?: string) => {
  const { data, ...rest } = useQuery(['fetch-department-alias', alias], () =>
    api.get(`view/department/${alias}`, {
      headers: authHeader(),
    })
  );
  const departmentData = data?.data;
  return { departmentData, ...rest };
};

export const useFetchDepartmentAdminsByAlias = (alias?: string) => {
  const { data, ...rest } = useQuery(
    ['fetch-department-admin-by-alias', alias],
    () =>
      api.get(`view/all_department_admins/for/${alias}/`, {
        headers: authHeader(),
      })
  );
  const departmentAdminsData = data?.data;
  return { departmentAdminsData, ...rest };
};
