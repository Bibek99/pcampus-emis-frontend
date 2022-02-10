import { AxiosRequestHeaders } from 'axios';
import { AUTH_USER_KEY } from '../../constants/auth';

export const authHeader = (): AxiosRequestHeaders => {
  const user = JSON.parse(localStorage.getItem(AUTH_USER_KEY) || '');
  if (user && user.access) {
    return {
      Authorization: `Bearer ${user.access}`,
    };
  }
  return {};
};
