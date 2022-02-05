import {
  ArchivedClassesIcon,
  CalenderIcon,
  ClassesIcon,
  DashboardIcon,
  DepartmentIcon,
  NoticesIcon,
  ResultsIcon,
  StudentsIcon,
  TeachersIcon,
} from '../icons';

export const AdminRoutes = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon className="" />,
    path: '/dashboard',
  },
  {
    title: 'Notices',
    icon: <NoticesIcon className="" />,
    path: '/notices',
  },
  {
    title: 'Departments',
    icon: <DepartmentIcon className="" />,
    path: '/departments',
  },
  {
    title: 'Students',
    icon: <StudentsIcon className="" />,
    path: '/students',
  },
  {
    title: 'Teachers',
    icon: <TeachersIcon className="" />,
    path: '/teachers',
  },
  {
    title: 'Calendar',
    icon: <CalenderIcon className="" />,
    path: '/calendar',
  },
  {
    title: 'Results',
    icon: <ResultsIcon className="" />,
    path: '/results',
  },
  {
    title: 'Classes',
    icon: <ClassesIcon className="" />,
    path: '/classes',
  },
  {
    title: 'Archived Classes',
    icon: <ArchivedClassesIcon className="" />,
    path: '/archived-classes',
  },
];
