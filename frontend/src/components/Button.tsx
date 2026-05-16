import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-premium-dark text-white font-hand text-xl shadow-mini hover:translate-y-[-2px] hover:shadow-card active:translate-y-[0px]',
      secondary: 'bg-white border-2 border-premium-dark text-premium-dark font-hand text-xl shadow-mini hover:translate-y-[-2px] hover:shadow-card active:translate-y-[0px]',
      outline: 'border-2 border-premium-dark text-premium-dark bg-transparent font-hand text-xl hover:bg-premium-dark hover:text-white',
      ghost: 'bg-transparent text-premium-gray hover:text-premium-dark',
    };

    const sizes = {
      sm: 'px-4 py-1.5 text-base',
      md: 'px-6 py-2.5 text-lg',
      lg: 'px-10 py-3.5 text-2xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
