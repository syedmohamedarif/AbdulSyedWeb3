import { GraduationCap } from 'lucide-react';
import { type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface CoursesProps extends HTMLAttributes<HTMLDivElement> {}

export default function Courses({ className, ...props }: CoursesProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-8", className)} {...props}>
      <div className="flex items-center mb-6">
        <GraduationCap className="w-8 h-8 text-blue-900 mr-4" />
        <h2 className="text-2xl font-bold">Courses Offered to General Practitioners</h2>
      </div>
      <ul className="text-gray-600">
        <li>Management of Breast pain in the community</li>
      </ul>
    </div>
  );
}