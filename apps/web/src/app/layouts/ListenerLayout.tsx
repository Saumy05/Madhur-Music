import React from 'react';
import { Outlet } from 'react-router';
import { HeaderNav } from '@/components/layout/HeaderNav';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { BottomNav } from '@/components/layout/BottomNav';
import { MiniPlayer } from '@/components/player/MiniPlayer';
import { FullPlayerModal } from '@/components/player/FullPlayerModal';

export const ListenerLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fff8f7] text-[#281718] dark:bg-[#180d0e] dark:text-white flex flex-col font-body">
      <HeaderNav />

      <div className="flex-1 flex max-w-[1800px] w-full mx-auto">
        <SidebarNav />

        <main className="flex-1 p-4 sm:p-8 pb-32 lg:pb-24 overflow-x-hidden min-w-0">
          <Outlet />
        </main>
      </div>

      <MiniPlayer />
      <BottomNav />
      <FullPlayerModal />
    </div>
  );
};
