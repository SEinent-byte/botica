import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'default';
  size?: 'sm' | 'md';
}

export default function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    primary: 'bg-gradient-to-r from-primary-500/10 to-primary-600/10 text-primary-700 border border-primary-200',
    secondary: 'bg-gradient-to-r from-secondary-500/10 to-secondary-600/10 text-secondary-700 border border-secondary-200',
    success: 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-emerald-700 border border-emerald-200',
    danger: 'bg-gradient-to-r from-danger-500/10 to-danger-600/10 text-danger-700 border border-danger-200',
    warning: 'bg-gradient-to-r from-warning-500/10 to-warning-600/10 text-warning-700 border border-warning-200',
    info: 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 border border-blue-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-bold rounded-full shadow-sm',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
