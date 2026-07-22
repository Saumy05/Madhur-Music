import React from 'react';
import { Link } from 'react-router';

interface LogoProps {
  className?: string;
  imgClassName?: string;
  textClassName?: string;
  showText?: boolean;
  size?: number;
  to?: string;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  imgClassName = '',
  textClassName = '',
  showText = true,
  size = 36,
  to,
}) => {
  const content = (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <img
        src="/logo.png"
        alt="Melody Logo"
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`object-contain transition-transform group-hover:scale-105 rounded-xl ${imgClassName}`}
      />
      {showText && (
        <span
          className={`font-extrabold text-xl tracking-tight text-[#ba0034] dark:text-white ${textClassName}`}
        >
          Madhur
        </span>
      )}
    </div>
  );

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
};
