import React from 'react';

export const ArtistCommentsPage: React.FC = () => {
  const comments = [
    { author: 'Elena R.', track: 'Velvet Horizon', text: 'The vocal bridge at 2:45 gives me chills every time! Best release of 2026.', time: '2 hours ago' },
    { author: 'Marcus V.', track: 'Midnight Serenade', text: 'Can wait to hear this live at MSG! Bought VIP pit tickets already.', time: '5 hours ago' },
    { author: 'Chloe S.', track: 'Velvet Horizon', text: 'Production on the bass synth is unbelievable. Dolby Atmos mix is 10/10.', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
          Fan Comments & Community Engagement
        </h1>
        <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
          Reply to fan comments across your tracks, pin top fan reactions & moderate track feedback.
        </p>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-white/40 space-y-4">
        <h2 className="text-lg font-extrabold text-[#281718] dark:text-white">Recent Track Comments</h2>
        <div className="space-y-3">
          {comments.map((c, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#ffe9e9]/50 dark:bg-white/5 border border-white/40 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-extrabold text-[#ba0034]">{c.author} <span className="text-[#5d3f40] dark:text-zinc-400 font-normal">on {c.track}</span></span>
                <span className="text-[10px] text-[#5d3f40] dark:text-zinc-400">{c.time}</span>
              </div>
              <p className="text-xs font-semibold text-[#281718] dark:text-zinc-200">{c.text}</p>
              <div className="flex gap-2 pt-1">
                <button className="px-3 py-1 rounded-xl bg-[#ba0034] text-white font-bold text-[11px] hover:bg-[#a0002d] transition-all cursor-pointer">
                  Reply as Artist
                </button>
                <button className="px-3 py-1 rounded-xl bg-[#ffe9e9] dark:bg-white/10 text-[#8d2ebc] font-bold text-[11px] hover:bg-[#8d2ebc] hover:text-white transition-all cursor-pointer">
                  Pin Comment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
