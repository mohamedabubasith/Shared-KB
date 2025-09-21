
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseClasses = 'px-4 py-2 rounded-lg font-semibold transition-transform transform active:scale-95 flex items-center justify-center gap-2';
    const variantClasses = {
        primary: 'bg-nvidia-green text-white hover:bg-soft-green disabled:bg-gray-500',
        secondary: 'bg-dark-border text-gray-200 hover:bg-gray-600 disabled:bg-gray-800',
    };

    return (
        <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
