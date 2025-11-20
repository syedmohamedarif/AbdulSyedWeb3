import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded transition-colors duration-200";
  const variantStyles = {
    primary: "bg-blue-900 text-white hover:bg-blue-800",
    secondary: "bg-white text-blue-900 hover:bg-gray-100"
  };
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}