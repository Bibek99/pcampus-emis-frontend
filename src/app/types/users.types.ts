export type UserRole =
  | 'ROLE_ADMIN'
  | 'ROLE_STUDENT'
  | 'ROLE_TEACHER'
  | 'ROLE_DEPT_ADMIN';

export interface User {
  id?: number;
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  email?: string;
  address?: string;
  gender?: string;
  phone?: string;
  refresh?: string;
  access?: string;
  token?: string;
  admin?: boolean;
  staff?: boolean;
  student?: boolean;
  teacher?: boolean;
  images?: string;
  activated?: boolean;
}

export interface UserList {
  content?: User[];
  totalItems?: number;
}
