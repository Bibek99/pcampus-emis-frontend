import { BreadCrumb, MainNav, SideBar } from '@app/components';
import { DashboardLayout } from '@app/layout';
import React, { useState } from 'react';

const DashboardPage: React.FC<{}> = ({ children }) => {
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
        />
      }
    >
      <BreadCrumb />
      {children}
    </DashboardLayout>
  );
};

export default DashboardPage;
