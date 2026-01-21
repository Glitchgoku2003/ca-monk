import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Card({ className = '', children, onClick }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white overflow-hidden ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export function CardHeader({ className = '', children }: CardHeaderProps) {
  return <div className={`px-4 py-3 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export function CardTitle({ className = '', children }: CardTitleProps) {
  return <h3 className={`text-base font-semibold ${className}`}>{children}</h3>;
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className = '', children }: CardContentProps) {
  return <div className={`px-4 py-2 ${className}`}>{children}</div>;
}
