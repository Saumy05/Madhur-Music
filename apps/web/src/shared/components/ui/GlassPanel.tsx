import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  glow = false,
  ...props
}) => {
  return (
    <div
      className={`glass-panel border border-white/40 dark:border-white/10 rounded-2xl ${
        glow ? 'artist-glow' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
