import { MainNav, SideBar } from '@app/components';
import { DashboardLayout } from '@app/layout';
import React, { useState } from 'react';

const DashboardPage: React.FC<{}> = () => {
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
      <div className="bg-gray-50 p-12">Ram</div>
      <div className="bg-gray-50 p-12">Ram</div>
      <div className="bg-gray-50 p-12">Ram</div>
      <div className="bg-gray-50 p-12">Ram</div>
      <div className="bg-gray-50 p-12">Ram</div>
      <div className="bg-gray-50 p-12">Ram</div>
      <div className="bg-gray-50 p-12">Ram</div>
      <div className="bg-gray-50 p-12">Ram</div>
      <div className="bg-gray-50 p-12">Ram</div>
      <div className="bg-gray-50 p-12">Ram</div>
    </DashboardLayout>
  );
};

export default DashboardPage;
