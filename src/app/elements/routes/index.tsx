import {
  AcademicCapIcon,
  ArchiveIcon,
  CalendarIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  InformationCircleIcon,
  OfficeBuildingIcon,
  PresentationChartBarIcon,
  TemplateIcon,
  UserGroupIcon,
} from '@heroicons/react/outline';

export const adminRoutes = [
  {
    title: 'Dashboard',
    icon: <TemplateIcon className="h-6 w-6" />,
    path: '/dashboard',
  },
  {
    title: 'Notices',
    icon: <InformationCircleIcon className="h-6 w-6" />,
    path: '/notices',
  },
  {
    title: 'Departments',
    icon: <OfficeBuildingIcon className="h-6 w-6" />,
    path: '/departments',
  },
  {
    title: 'Students',
    icon: <UserGroupIcon className="h-6 w-6" />,
    path: '/students',
  },
  {
    title: 'Teachers',
    icon: <AcademicCapIcon className="h-6 w-6" />,
    path: '/teachers',
  },
  {
    title: 'Department Users',
    icon: <AcademicCapIcon className="h-6 w-6" />,
    path: '/department-users',
  },
  {
    title: 'Calendar',
    icon: <CalendarIcon className="h-6 w-6" />,
    path: '/calendar',
  },
  {
    title: 'Results',
    icon: <ClipboardListIcon className="h-6 w-6" />,
    path: '/results',
  },
];

export const studentRoutes = [
  {
    title: 'Dashboard',
    icon: <TemplateIcon className="h-6 w-6" />,
    path: '/dashboard',
  },
  {
    title: 'Notices',
    icon: <InformationCircleIcon className="h-6 w-6" />,
    path: '/notices',
  },
  {
    title: 'Classes',
    icon: <PresentationChartBarIcon className="h-6 w-6" />,
    path: '/classes',
  },
  {
    title: 'Assignments',
    icon: <ClipboardCheckIcon className="h-6 w-6" />,
    path: '/assignments',
  },
  {
    title: 'Calendar',
    icon: <CalendarIcon className="h-6 w-6" />,
    path: '/calendar',
  },
  {
    title: 'Results',
    icon: <ClipboardListIcon className="h-6 w-6" />,
    path: '/results',
  },
  {
    title: 'Archived Classes',
    icon: <ArchiveIcon className="h-6 w-6" />,
    path: '/archived-classes',
  },
];

export const teacherRoutes = [
  {
    title: 'Dashboard',
    icon: <TemplateIcon className="h-6 w-6" />,
    path: '/dashboard',
  },
  {
    title: 'Notices',
    icon: <InformationCircleIcon className="h-6 w-6" />,
    path: '/notices',
  },
  {
    title: 'Classes',
    icon: <PresentationChartBarIcon className="h-6 w-6" />,
    path: '/classes',
  },
  {
    title: 'Calendar',
    icon: <CalendarIcon className="h-6 w-6" />,
    path: '/calendar',
  },
  {
    title: 'Results',
    icon: <ClipboardListIcon className="h-6 w-6" />,
    path: '/results',
  },
  {
    title: 'Archived Classes',
    icon: <ArchiveIcon className="h-6 w-6" />,
    path: '/archived-classes',
  },
];

export const departmentAdminRoutes = [
  {
    title: 'Dashboard',
    icon: <TemplateIcon className="h-6 w-6" />,
    path: '/dashboard',
  },
  {
    title: 'Notices',
    icon: <InformationCircleIcon className="h-6 w-6" />,
    path: '/notices',
  },
  {
    title: 'Classes',
    icon: <PresentationChartBarIcon className="h-6 w-6" />,
    path: '/classes',
  },
  {
    title: 'Students',
    icon: <UserGroupIcon className="h-6 w-6" />,
    path: '/students',
  },
  {
    title: 'Teachers',
    icon: <AcademicCapIcon className="h-6 w-6" />,
    path: '/teachers',
  },
  {
    title: 'Calendar',
    icon: <CalendarIcon className="h-6 w-6" />,
    path: '/calendar',
  },
  {
    title: 'Results',
    icon: <ClipboardListIcon className="h-6 w-6" />,
    path: '/results',
  },

  {
    title: 'Archived Classes',
    icon: <ArchiveIcon className="h-6 w-6" />,
    path: '/archived-classes',
  },
];
