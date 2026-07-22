import React from 'react';

export const AdminSubscriptionsPaymentsPage: React.FC = () => {
  const plans = [
    { name: 'Listener Backstage VIP', price: '$14.99/mo', subscribers: '142.8K', gross: '$2,140,572/mo' },
    { name: 'Artist Pro Suite', price: '$29.99/mo', subscribers: '18.4K', gross: '$551,816/mo' },
    { name: 'Podcast Host Premium', price: '$19.99/mo', subscribers: '9.2K', gross: '$183,908/mo' },
    { name: 'Music Label Enterprise', price: '$499.00/mo', subscribers: '420', gross: '$209,580/mo' },
    { name: 'Event Promoter Business', price: '$199.00/mo', subscribers: '890', gross: '$177,110/mo' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-2xl font-extrabold text-[#281718] dark:text-white">
          Subscription Tiers & Platform Revenue Metrics
        </h1>
        <p className="text-xs text-[#5d3f40] dark:text-zinc-400">
          Monitor recurring SaaS subscriptions, Stripe payment gateways, MRR, churn rates & billing tiers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((p) => (
          <div key={p.name} className="glass-panel p-6 rounded-3xl border border-white/40 space-y-3">
            <span className="text-[10px] font-bold text-[#ba0034] uppercase tracking-wider">{p.price}</span>
            <h3 className="font-extrabold text-base text-[#281718] dark:text-white">{p.name}</h3>

            <div className="flex justify-between items-center py-2 border-t border-[#e6bcbd]/40 dark:border-white/10 text-xs font-semibold">
              <span className="text-[#5d3f40] dark:text-zinc-400">{p.subscribers} active</span>
              <span className="text-[#8d2ebc] font-extrabold">{p.gross}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
