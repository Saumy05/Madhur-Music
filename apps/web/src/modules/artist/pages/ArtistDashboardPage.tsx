import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/shared/auth/useAuthStore';
import { PillButton } from '@/components/ui/PillButton';

// Monthly streams mock database
const STREAMS_DATA = [
  { month: 'Jan', streams: 380000, revenue: 2400 },
  { month: 'Feb', streams: 450000, revenue: 2900 },
  { month: 'Mar', streams: 580000, revenue: 3800 },
  { month: 'Apr', streams: 620000, revenue: 4100 },
  { month: 'May', streams: 790000, revenue: 5200 },
  { month: 'Jun', streams: 880000, revenue: 5900 },
  { month: 'Jul', streams: 980000, revenue: 6800 },
];

// Geographic stream hotspots
const GEOGRAPHIC_HOTSPOTS = [
  { city: 'London, UK', percentage: '24%', count: '235K streams', cx: 310, cy: 75, color: 'from-rose-500 to-purple-600' },
  { city: 'New York, US', percentage: '18%', count: '176K streams', cx: 200, cy: 95, color: 'from-blue-500 to-indigo-600' },
  { city: 'Tokyo, JP', percentage: '15%', count: '147K streams', cx: 580, cy: 110, color: 'from-amber-500 to-orange-600' },
  { city: 'Mumbai, IN', percentage: '12%', count: '118K streams', cx: 480, cy: 140, color: 'from-emerald-500 to-teal-600' },
  { city: 'Berlin, DE', percentage: '10%', count: '98K streams', cx: 340, cy: 80, color: 'from-fuchsia-500 to-pink-600' }
];

export const ArtistDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'streams' | 'revenue'>('streams');
  const [timeRange, setTimeRange] = useState('Last 7 Months');
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  const recentReleases = [
    { title: 'Velvet Horizon (Original Mix)', type: 'Single', streams: '1.2M', releaseDate: '2026-03-15', status: 'Active' },
    { title: 'Midnight Serenade', type: 'Single', streams: '890K', releaseDate: '2026-05-02', status: 'Active' },
    { title: 'Neon Echoes EP', type: 'EP', streams: '2.4M', releaseDate: '2026-01-20', status: 'Active' },
  ];

  return (
    <div className="space-y-6 pb-16 animate-in fade-in duration-300">
      
      {/* 1. ARTIST OVERVIEW HEADER BANNER */}
      <div className="relative overflow-hidden bg-black/40 border border-white/5 p-6 sm:p-8 rounded-3xl flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        
        {/* Glow Effects */}
        <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-[#ba0034]/15 blur-3xl pointer-events-none" />
        <div className="absolute -left-24 -bottom-24 w-80 h-80 rounded-full bg-[#8d2ebc]/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 relative z-10">
          <div className="relative shrink-0">
            <img
              src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
              alt="Artist Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#ba0034] shadow-2xl"
            />
            <span className="absolute -bottom-1.5 -right-1.5 bg-blue-500 text-white rounded-full p-1 shadow flex items-center justify-center">
              <span className="material-symbols-outlined text-[11px] font-black">verified</span>
            </span>
          </div>

          <div className="text-center sm:text-left space-y-1.5">
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
              <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-[#ba0034] text-white">
                Verified Artist
              </span>
              <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-zinc-300">
                Rank #124 Global
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {user?.name || "Saumya Tiwari"}
            </h1>
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-3 gap-y-1 text-[11px] text-zinc-400 font-bold">
              <span>🎧 <strong>1.28M</strong> Monthly Listeners</span>
              <span className="text-zinc-600">•</span>
              <span>👥 <strong>14.2K</strong> Followers</span>
            </div>

            {/* Profile Completion Bar */}
            <div className="pt-1.5 max-w-xs mx-auto sm:mx-0 space-y-1">
              <div className="flex justify-between text-[9px] font-black text-red-500 uppercase tracking-widest">
                <span>Console Configuration</span>
                <span>85% Complete</span>
              </div>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#ba0034] to-[#8d2ebc] rounded-full animate-pulse" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Studio Operations Actions */}
        <div className="flex flex-wrap gap-2 relative z-10 self-center xl:self-auto justify-center">
          <button
            onClick={() => navigate('/artist/upload')}
            className="px-4.5 py-2.5 rounded-xl text-xs font-bold bg-white/5 border border-white/10 hover:border-[#ba0034] text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">cloud_upload</span>
            <span>Upload Track</span>
          </button>
          
          <button
            onClick={() => navigate('/artist/albums')}
            className="px-4.5 py-2.5 rounded-xl text-xs font-bold bg-[#ba0034] hover:bg-[#a0002b] text-white transition-all flex items-center gap-1.5 shadow-lg shadow-[#ba0034]/20 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>Create Release</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN ANALYTICS STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: 'Monthly Streams', value: '4.89M', change: '+18.4%', trend: 'up', icon: 'equalizer', color: 'text-rose-500 bg-rose-500/10' },
          { label: 'Followers Growth', value: '+2,410', change: '+12.1%', trend: 'up', icon: 'group', color: 'text-purple-500 bg-purple-500/10' },
          { label: 'Est. Earnings (USD)', value: '$18,420', change: '+15.2%', trend: 'up', icon: 'payments', color: 'text-emerald-500 bg-emerald-500/10' },
          { label: 'Playlist Adds', value: '42.8K', change: '+8.4%', trend: 'up', icon: 'playlist_add', color: 'text-blue-500 bg-blue-500/10' },
          { label: 'Pending Royalties', value: '$4,820', change: 'Payout Aug 1', trend: 'neutral', icon: 'account_balance', color: 'text-amber-500 bg-amber-500/10' },
        ].map((card) => (
          <div key={card.label} className="bg-black/30 border border-white/5 p-4.5 rounded-2xl flex flex-col justify-between gap-4 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between">
              <span className={`p-2 rounded-lg ${card.color}`}>
                <span className="material-symbols-outlined text-base">{card.icon}</span>
              </span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                card.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-500/10 text-zinc-400'
              }`}>
                {card.change}
              </span>
            </div>
            <div>
              <p className="text-[9px] text-zinc-500 font-black uppercase tracking-wider">{card.label}</p>
              <h3 className="text-xl font-black mt-0.5 text-white">{card.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* 3. PERFORMANCE CHARTS & HEATMAP GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Streams & Revenue Chart (Span 2) */}
        <div className="xl:col-span-2 bg-black/40 border border-white/5 p-5 sm:p-6 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-white/5 pb-4">
            <div>
              <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ba0034] text-base">insights</span>
                Performance Analytics
              </h3>
              <p className="text-[11px] text-zinc-500">Track stream metrics and revenue distributions</p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="bg-white/5 p-1 rounded-xl flex gap-1 text-[10px] font-black">
                <button
                  onClick={() => setActiveTab('streams')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'streams' ? 'bg-gradient-to-r from-[#ba0034] to-[#8d2ebc] text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Streams
                </button>
                <button
                  onClick={() => setActiveTab('revenue')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'revenue' ? 'bg-gradient-to-r from-[#ba0034] to-[#8d2ebc] text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Revenue
                </button>
              </div>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black text-zinc-300 focus:border-[#ba0034] outline-none"
              >
                <option value="Last 7 Months">Last 7 Months</option>
                <option value="Year to Date">Year to Date</option>
              </select>
            </div>
          </div>

          {/* SVG Visual Chart */}
          <div className="h-64 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="none">
              <defs>
                <linearGradient id="streamsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ba0034" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8d2ebc" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8d2ebc" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00694b" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="50" y1="40" x2="650" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="50" y1="100" x2="650" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
              <line x1="50" y1="160" x2="650" y2="160" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

              {activeTab === 'streams' ? (
                <>
                  {/* Fill area */}
                  <path
                    d="M 50,180 Q 150,150 250,130 T 450,80 T 650,40 L 650,220 L 50,220 Z"
                    fill="url(#streamsGrad)"
                  />
                  {/* Stroke path */}
                  <path
                    d="M 50,180 Q 150,150 250,130 T 450,80 T 650,40"
                    fill="none"
                    stroke="#ba0034"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Dots */}
                  {[
                    { cx: 50, cy: 180, val: '380K' },
                    { cx: 150, cy: 150, val: '450K' },
                    { cx: 250, cy: 130, val: '580K' },
                    { cx: 350, cy: 105, val: '620K' },
                    { cx: 450, cy: 80, val: '790K' },
                    { cx: 550, cy: 60, val: '880K' },
                    { cx: 650, cy: 40, val: '980K' },
                  ].map((p, idx) => (
                    <g key={idx} className="group/dot cursor-pointer">
                      <circle cx={p.cx} cy={p.cy} r="6" fill="#0d0708" stroke="#ba0034" strokeWidth="3" />
                      <circle cx={p.cx} cy={p.cy} r="10" fill="#ba0034" className="opacity-0 hover:opacity-20 transition-opacity" />
                    </g>
                  ))}
                </>
              ) : (
                <>
                  {/* Fill Area */}
                  <path
                    d="M 50,160 Q 150,140 250,110 T 450,70 T 650,30 L 650,220 L 50,220 Z"
                    fill="url(#revenueGrad)"
                  />
                  {/* Stroke path */}
                  <path
                    d="M 50,160 Q 150,140 250,110 T 450,70 T 650,30"
                    fill="none"
                    stroke="#8d2ebc"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Dots */}
                  {[
                    { cx: 50, cy: 160, val: '$2.4K' },
                    { cx: 150, cy: 140, val: '$2.9K' },
                    { cx: 250, cy: 110, val: '$3.8K' },
                    { cx: 350, cy: 95, val: '$4.1K' },
                    { cx: 450, cy: 70, val: '$5.2K' },
                    { cx: 550, cy: 50, val: '$5.9K' },
                    { cx: 650, cy: 30, val: '$6.8K' },
                  ].map((p, idx) => (
                    <g key={idx} className="group/dot cursor-pointer">
                      <circle cx={p.cx} cy={p.cy} r="6" fill="#0d0708" stroke="#8d2ebc" strokeWidth="3" />
                      <circle cx={p.cx} cy={p.cy} r="10" fill="#8d2ebc" className="opacity-0 hover:opacity-20 transition-opacity" />
                    </g>
                  ))}
                </>
              )}

              {/* Baseline */}
              <line x1="50" y1="220" x2="650" y2="220" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            </svg>

            {/* X-Axis Month Labels */}
            <div className="flex justify-between px-6 text-[10px] font-black text-zinc-500 mt-2">
              {STREAMS_DATA.map((d) => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </div>

          {/* Sub-KPI Row */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5 text-center text-xs">
            <div>
              <p className="text-zinc-500 font-semibold">Peak Streaming Hour</p>
              <h4 className="font-extrabold text-sm mt-0.5 text-white">9:00 PM EST</h4>
            </div>
            <div>
              <p className="text-zinc-500 font-semibold">Daily Listeners</p>
              <h4 className="font-extrabold text-sm mt-0.5 text-white">34.2K Avg</h4>
            </div>
            <div>
              <p className="text-zinc-500 font-semibold">Average Retention</p>
              <h4 className="font-extrabold text-sm mt-0.5 text-white">82.4%</h4>
            </div>
          </div>
        </div>

        {/* Geographic Heatmap Column (Span 1) */}
        <div className="bg-black/40 border border-white/5 p-5 sm:p-6 rounded-3xl flex flex-col justify-between gap-5">
          <div>
            <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ba0034] text-base">public</span>
              Global Stream Heatmap
            </h3>
            <p className="text-[11px] text-zinc-500">Top geographic centers by listen count</p>
          </div>

          {/* Styled SVG World Outline Map with Pulsing Dots */}
          <div className="relative h-44 w-full bg-white/5 rounded-2xl overflow-hidden flex items-center justify-center border border-white/5">
            <svg className="w-full h-full opacity-60" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
              {/* Simplistic mock continents outlines */}
              <path d="M120,80 Q200,90 220,120 T200,200 T180,280 L100,260 Z" fill="rgba(255,255,255,0.05)" />
              <path d="M280,80 Q320,60 380,80 T400,160 T350,220 L300,180 Z" fill="rgba(255,255,255,0.05)" />
              <path d="M420,180 Q480,140 520,180 T560,250 T500,320 Z" fill="rgba(255,255,255,0.05)" />
              <path d="M540,80 Q620,90 680,130 T650,220 L580,180 Z" fill="rgba(255,255,255,0.05)" />
              
              {/* Map grid lines */}
              <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="400" y1="0" x2="400" y2="400" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Glowing Coordinate Pins */}
              {GEOGRAPHIC_HOTSPOTS.map((hotspot) => (
                <g
                  key={hotspot.city}
                  onMouseEnter={() => setHoveredHotspot(hotspot.city)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  className="cursor-pointer"
                >
                  <circle cx={hotspot.cx} cy={hotspot.cy} r="6" fill="#ba0034" />
                  <circle cx={hotspot.cx} cy={hotspot.cy} r="14" fill="#ba0034" className="animate-ping opacity-25" />
                  {hoveredHotspot === hotspot.city && (
                    <circle cx={hotspot.cx} cy={hotspot.cy} r="10" fill="#8d2ebc" className="opacity-40 animate-pulse" />
                  )}
                </g>
              ))}
            </svg>

            {/* Floating details overlay on hover */}
            <div className="absolute bottom-2 left-2 right-2 bg-black/80 border border-white/10 rounded-xl p-2 flex items-center justify-between text-[10px]">
              <span className="font-bold text-zinc-300">
                {hoveredHotspot ? hoveredHotspot : 'Hover pins to inspect'}
              </span>
              <span className="text-red-400 font-extrabold">
                {hoveredHotspot ? GEOGRAPHIC_HOTSPOTS.find(h => h.city === hoveredHotspot)?.count : 'Global Metrics'}
              </span>
            </div>
          </div>

          {/* Hotspots List */}
          <div className="space-y-2">
            {GEOGRAPHIC_HOTSPOTS.map((hotspot) => (
              <div
                key={hotspot.city}
                onMouseEnter={() => setHoveredHotspot(hotspot.city)}
                onMouseLeave={() => setHoveredHotspot(null)}
                className={`flex items-center justify-between p-2.5 rounded-xl transition-colors cursor-pointer ${
                  hoveredHotspot === hotspot.city ? 'bg-white/5 border-l-2 border-red-500' : 'bg-transparent border-l-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ba0034]" />
                  <span className="text-xs font-bold text-zinc-200">{hotspot.city}</span>
                </div>
                <div className="flex items-center gap-2 text-right">
                  <span className="text-[11px] font-semibold text-zinc-400">{hotspot.count}</span>
                  <span className="text-[10px] font-black text-red-500 bg-[#ba0034]/10 px-2 py-0.5 rounded-md">
                    {hotspot.percentage}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 4. TRACK DISCOGRAPHY & TOP SONGS */}
      <div className="bg-black/40 border border-white/5 p-5 sm:p-6 rounded-3xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba0034] text-base">album</span>
            Releases & Audio Catalog
          </h3>
          <button
            onClick={() => navigate('/artist/albums')}
            className="text-[11px] text-red-500 font-black hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>View Full Catalog</span>
            <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 text-zinc-500 font-bold uppercase text-[9px] tracking-wider">
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Release Type</th>
                <th className="py-2.5 px-3">Global Stream Count</th>
                <th className="py-2.5 px-3">Publish Date</th>
                <th className="py-2.5 px-3">Outlets Dist.</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-semibold text-zinc-300">
              {recentReleases.map((release) => (
                <tr key={release.title} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#ba0034] text-base">audiotrack</span>
                    <span>{release.title}</span>
                  </td>
                  <td className="py-3 px-3">{release.type}</td>
                  <td className="py-3 px-3 text-white font-extrabold">{release.streams}</td>
                  <td className="py-3 px-3">{release.releaseDate}</td>
                  <td className="py-3 px-3">12 / 12</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-bold">
                      {release.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => navigate('/artist/albums')}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#ba0034] text-[10px] font-black text-zinc-300 hover:text-white transition-all cursor-pointer"
                    >
                      Configure
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. AUDIENCE DEMOGRAPHICS & TASKS / SYSTEM CHECKLIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Audience Demographics */}
        <div className="bg-black/40 border border-white/5 p-5 sm:p-6 rounded-3xl space-y-4">
          <h4 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba0034] text-base">bar_chart</span>
            Audience Demographics
          </h4>
          <div className="space-y-4 text-xs font-semibold">
            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Age: 18 - 24 (Gen Z)</span>
                <span className="font-extrabold text-white">45%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#ba0034] rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Age: 25 - 34 (Millennials)</span>
                <span className="font-extrabold text-white">30%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-[#8d2ebc] rounded-full" style={{ width: '30%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-zinc-300 mb-1">
                <span>Age: 35+</span>
                <span className="font-extrabold text-white">25%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '25%' }} />
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Listener Gender Split:</span>
              <strong className="text-zinc-200">50% Female / 48% Male / 2% Non-binary</strong>
            </div>
          </div>
        </div>

        {/* Studio Tasks Checklist */}
        <div className="bg-black/40 border border-white/5 p-5 sm:p-6 rounded-3xl space-y-4">
          <h4 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba0034] text-base">task_alt</span>
            Studio Checklist Tasks
          </h4>
          <div className="space-y-3.5 text-xs font-semibold text-zinc-300">
            <div className="flex items-start gap-2.5">
              <input type="checkbox" defaultChecked disabled className="mt-0.5 accent-[#ba0034]" />
              <span className="line-through text-zinc-500">Verify official passport identity profile</span>
            </div>
            <div className="flex items-start gap-2.5">
              <input type="checkbox" defaultChecked disabled className="mt-0.5 accent-[#ba0034]" />
              <span className="line-through text-zinc-500">Connect Stripe payouts routing portal</span>
            </div>
            <div className="flex items-start gap-2.5">
              <input type="checkbox" disabled className="mt-0.5 accent-[#ba0034]" />
              <span>Configure lyric synchronization for Cosmic Drift</span>
            </div>
            <div className="flex items-start gap-2.5">
              <input type="checkbox" disabled className="mt-0.5 accent-[#ba0034]" />
              <span>Submit master lossless stem isolates</span>
            </div>
            <div className="flex items-start gap-2.5">
              <input type="checkbox" disabled className="mt-0.5 accent-[#ba0034]" />
              <span>Add songwriter split metadata agreements</span>
            </div>
          </div>
        </div>

        {/* DRM / Alerts / Releases Info */}
        <div className="bg-black/40 border border-white/5 p-5 sm:p-6 rounded-3xl space-y-4">
          <h4 className="font-extrabold text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ba0034] text-base">shield_with_heart</span>
            System Status & Payouts
          </h4>
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-semibold">
              <div className="flex items-center gap-2 font-bold mb-0.5">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>DRM Status Clean</span>
              </div>
              <p className="text-[10px] text-zinc-500">0 copyright warnings, claims, or active disputes detected.</p>
            </div>

            <div className="p-3 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-blue-400 text-xs font-semibold">
              <div className="flex items-center gap-2 font-bold mb-0.5">
                <span className="material-symbols-outlined text-base">calendar_month</span>
                <span>Cosmic Drift EP Release</span>
              </div>
              <p className="text-[10px] text-zinc-500">Scheduled for full global distribution on August 20, 2026.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
