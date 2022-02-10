import { LoginInterceptorModal } from '@app/auth/LoginInterceptorModal';
import { BreadCrumb, MainNav, SideBar } from '@app/components';
import { DashboardLayout } from '@app/layout';
import { useAccount } from '@app/services/account.service';
import React, { useState } from 'react';

const DashboardPage: React.FC<{}> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const { account } = useAccount();

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
