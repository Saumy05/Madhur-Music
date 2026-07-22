import React from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';

export const PromoterSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-white">
          Event Promoter Settings
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400">
          Manage ticketing provider accounts, event contract limits, default venue information, and box office splits.
        </p>
      </div>

      {/* Ticket Vendor Sync */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <h3 className="font-bold text-lg text-white">
          Ticketing & Event Integrations
        </h3>
        <div className="space-y-3">
          {[
            { title: 'Auto-Distribute Tickets to Partners', desc: 'Sync ticket sale channels to Ticketmaster, DICE, and Resident Advisor' },
            { title: 'Hold Tax Revenue Splits', desc: 'Auto-reserve municipal event taxes on checkout purchase' },
            { title: 'Enable Smart Waitlist', desc: 'Turn on waiting list triggers for sold-out live events' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 cursor-pointer hover:bg-white/10"
            >
              <div>
                <p className="text-xs font-bold text-white">
                  {item.title}
                </p>
                <span className="text-[10px] text-red-500 font-semibold">
                  {item.desc}
                </span>
              </div>
              <input
                type="checkbox"
                defaultChecked={idx === 2}
                className="w-4 h-4 text-red-600 bg-zinc-700 border-zinc-600 rounded focus:ring-red-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => navigate('/promoter/events')}
          className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              event_seat
            </span>
            <span className="font-bold text-sm text-white">
              Event Management Dashboard
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-zinc-400">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => navigate('/promoter/venues')}
          className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer hover:bg-white/5 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#ba0034]">
              location_city
            </span>
            <span className="font-bold text-sm text-white">
              Venues Directory List
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-zinc-400">
            chevron_right
          </span>
        </div>

        <div
          onClick={() => {
            logout();
            navigate('/promoter/login');
          }}
          className="glass-panel p-5 rounded-2xl border border-red-500/20 hover:border-red-500/50 cursor-pointer bg-red-500/5 hover:bg-red-500/10 transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-red-500">
              logout
            </span>
            <span className="font-bold text-sm text-red-400">
              Exit Promoter Suite
            </span>
          </div>
          <span className="material-symbols-outlined text-lg text-red-500">
            chevron_right
          </span>
        </div>
      </div>
    </div>
  );
};
