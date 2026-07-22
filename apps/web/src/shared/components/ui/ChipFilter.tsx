import React from 'react';

interface ChipFilterProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  icon?: string;
}

export const ChipFilter: React.FC<ChipFilterProps> = ({
  label,
  isActive = false,
  onClick,
  icon,
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 ${
        isActive
          ? 'premium-gradient text-white shadow-md'
          : 'bg-[#ffe9e9] text-[#281718] hover:bg-[#ffe1e1] dark:bg-zinc-800 dark:text-zinc-200'
      }`}
    >
      {icon && <span className="material-symbols-outlined text-base">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
