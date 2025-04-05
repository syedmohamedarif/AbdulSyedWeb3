import { type TextareaHTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export default function FormTextarea({ 
  error, 
  className,
  ...props 
}: FormTextareaProps) {
  return (
    <div>
      <textarea
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