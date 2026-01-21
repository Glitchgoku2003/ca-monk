import React from 'react';

interface BadgeProps {
  className?: string;
  variant?: 'default' | 'secondary';
  children: React.ReactNode;
}

export function Badge({ className = '', variant = 'default', children }: BadgeProps) {
  const variantClasses = {
    default: 'bg-blue-100 text-blue-800',
    secondary: 'bg-slate-200 text-slate-700',
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
