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
    <div data-testid="badge-container" className="relative inline-block">
      {children}
      {text && (
        <span
          data-testid="badge"
          className={`absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none transform translate-x-1/2 -translate-y-1/2 rounded-full ${badgeColorClassName} ${extendsBadgeClassName}`}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default Badge;
