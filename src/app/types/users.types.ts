export type UserRole =
  | 'ROLE_ADMIN'
  | 'ROLE_STUDENT'
  | 'ROLE_TEACHER'
  | 'ROLE_DEPT_ADMIN';

export interface User {
  id: number;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  activated?: boolean;
}

export interface UserList {
  content: User[];
  totalItems: number;
}
