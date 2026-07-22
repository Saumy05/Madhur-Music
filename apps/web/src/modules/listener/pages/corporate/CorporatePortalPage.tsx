import React from 'react';
import { useNavigate } from 'react-router';

export const CorporatePortalPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-[#00694b] text-white">
          Role Portal • Executive
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-1">
          Corporate & Executive Portal
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          Executive financial reports, enterprise SOC2 compliance, brand design tokens, and investor metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => navigate('/corporate')}
          className="glass-panel p-6 rounded-3xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all space-y-2"
        >
          <span className="material-symbols-outlined text-4xl text-[#00694b]">
            domain
          </span>
          <h4 className="font-bold text-base text-[#281718] dark:text-white">
            Corporate Finance & ARR Metrics
          </h4>
          <p className="text-xs text-[#5d3f40]">
            Review quarterly gross revenue, EBITDA margins, and publishing tax withholdings.
          </p>
        </div>

        <div
          onClick={() => navigate('/corporate/security')}
          className="glass-panel p-6 rounded-3xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all space-y-2"
        >
          <span className="material-symbols-outlined text-4xl text-[#ba0034]">
            security
          </span>
          <h4 className="font-bold text-base text-[#281718] dark:text-white">
            SOC2 Type II & Security Compliance
          </h4>
          <p className="text-xs text-[#5d3f40]">
            Audit logs, DRM audio watermarking standards, and ISO 27001 compliance badges.
          </p>
        </div>

        <div
          onClick={() => navigate('/style-guide')}
          className="glass-panel p-6 rounded-3xl border border-white/40 artist-glow cursor-pointer hover:bg-[#ffe9e9]/50 transition-all space-y-2"
        >
          <span className="material-symbols-outlined text-4xl text-[#8d2ebc]">
            palette
          </span>
          <h4 className="font-bold text-base text-[#281718] dark:text-white">
            Brand Identity & Design Tokens
          </h4>
          <p className="text-xs text-[#5d3f40]">
            Official Madhur typography guidelines, color palettes, and glassmorphic UI assets.
          </p>
        </div>
      </div>
    </div>
  );
};
