import React from 'react';
import { useNavigate } from 'react-router';

export const DeveloperPortalHubPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-cyan-600 text-white">
          Role Portal • Developer
        </span>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-[#281718] dark:text-white mt-1">
          Open API & Developer Portal
        </h1>
        <p className="text-xs sm:text-sm text-[#5d3f40]">
          RESTful audio APIs, GraphQL schemas, Webhooks, and Web Audio SDK integration.
        </p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/40 artist-glow space-y-4">
        <h3 className="font-bold text-lg text-[#281718] dark:text-white">
          API Key Credentials & Rate Limits
        </h3>
        <div className="p-4 rounded-2xl bg-[#ffe9e9]/60 dark:bg-white/5 font-mono text-xs text-[#ba0034]">
          madhur_live_pk_89012384910238491023
        </div>
        <p className="text-xs text-[#5d3f40]">Rate Limit: 10,000 API Requests / Minute (Production Tier)</p>
      </div>
    </div>
  );
};
