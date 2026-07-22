import React from 'react';

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children: React.ReactNode;
}

export const PillButton: React.FC<PillButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glow = false,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-xs font-semibold',
    md: 'px-6 py-2.5 text-sm font-semibold',
    lg: 'px-8 py-3.5 text-base font-bold',
  };

  const variantClasses = {
    primary: `premium-gradient text-white ${glow ? 'glow-button' : ''} hover:opacity-95`,
    secondary: 'bg-[#ffe9e9] text-[#ba0034] hover:bg-[#ffe1e1] dark:bg-[#5d3f40]/40 dark:text-white',
    ghost: 'bg-transparent text-[#281718] hover:bg-black/5 dark:text-white dark:hover:bg-white/10',
    outline: 'border border-[#ba0034] text-[#ba0034] hover:bg-[#ba0034] hover:text-white',
  };

  return (
    <button
      className={`rounded-full transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
