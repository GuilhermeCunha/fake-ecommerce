import React from 'react';

// import { Container } from './styles';

export type BadgeProps = {
  children: React.ReactNode;
  text?: string;
  extendsBadgeClassName?: string;
  badgeColorClassName?: string;
};
const Badge = ({
  children,
  text,
  extendsBadgeClassName = '',
  badgeColorClassName = 'bg-red-600 text-red-100',
}: BadgeProps) => {
  return (
    <span className="relative inline-block">
      {children}
      {text && (
        <span
          className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none transform translate-x-1/2 -translate-y-1/2 rounded-full ${badgeColorClassName} ${extendsBadgeClassName}`}
        >
          {text}
        </span>
      )}
    </span>
  );
};

export default Badge;
