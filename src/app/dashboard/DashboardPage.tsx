import { LoginInterceptorModal } from '@app/auth/LoginInterceptorModal';
import { BreadCrumb, MainNav, SideBar } from '@app/components';
import { DashboardLayout } from '@app/layout';
import React, { useState } from 'react';

interface DashboardPage {
  routes?: any;
  children?: any;
}

const DashboardPage: React.FC<DashboardPage> = ({ routes, children }: any) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardLayout
      navbar={
        <MainNav
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      }
      sidebar={
        <SideBar
          isSidebarOpen={isSidebarOpen}
          setSidebarOpen={setSidebarOpen}
          routes={routes}
        />
      }
    >
      <BreadCrumb />
      {children}
      <LoginInterceptorModal />
    </DashboardLayout>
  );
};

export default DashboardPage;
