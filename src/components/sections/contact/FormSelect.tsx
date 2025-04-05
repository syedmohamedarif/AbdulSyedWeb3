import { type SelectHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

export default function FormSelect({ 
  error, 
  className,
  children,
  ...props 
}: FormSelectProps) {
  return (
    <div>
      <select
        className={cn(
          "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}