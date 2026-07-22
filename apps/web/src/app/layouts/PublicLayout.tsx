import React from 'react';
import { Outlet } from 'react-router';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#281718] dark:bg-[#180d0e] dark:text-white flex flex-col font-body transition-colors duration-200">
      <main className="flex-1 overflow-x-hidden min-w-0">
        <Outlet />
      </main>
    </div>
  );
};
