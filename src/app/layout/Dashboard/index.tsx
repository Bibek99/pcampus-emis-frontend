import React from 'react';

type DashboardLayoutType = {
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
  children?: React.ReactNode;
};

export const DashboardLayout: React.FC<DashboardLayoutType> = ({
  sidebar,
  navbar,
  children,
}) => {
  return (
    <div className="relative flex h-screen flex-col">
      {navbar}
      <div className="flex overflow-hidden">
        <div className="min-h-screen ">{sidebar}</div>
        <main className="relative w-full flex-row overflow-y-auto overflow-x-hidden bg-gray-200 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
