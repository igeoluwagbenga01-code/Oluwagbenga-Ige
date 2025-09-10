import React from 'react';

// FIX: Add a `size` prop to support different button sizes and resolve type errors.
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size = 'md', ...props }) => {
  // FIX: Padding classes are now handled by `sizeClasses`, so they are removed from `baseClasses`.
  const baseClasses = 'rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-brand-purple text-white hover:bg-brand-light-purple focus:ring-brand-purple',
    secondary: 'bg-dark-card text-dark-text hover:bg-dark-border focus:ring-brand-purple',
    outline: 'bg-transparent border border-dark-border text-dark-text hover:bg-dark-card focus:ring-brand-purple',
  };

  // FIX: Define classes for each button size.
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    // FIX: Apply the appropriate size class along with other classes.
    <button className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;