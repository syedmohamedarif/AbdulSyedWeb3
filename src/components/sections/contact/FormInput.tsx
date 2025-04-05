import { type InputHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export default function FormInput({ 
  error, 
  className,
  ...props 
}: FormInputProps) {
  return (
    <div>
      <input
        className={cn(
          "w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}