import { Building2 } from 'lucide-react';
import { type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface ConsultantPostsProps extends HTMLAttributes<HTMLDivElement> {}

export default function ConsultantPosts({ className, ...props }: ConsultantPostsProps) {
  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-lg", className)} {...props}>
      <Building2 className="w-12 h-12 text-blue-900 mb-4" />
      <h2 className="text-xl font-bold mb-4">Current NHS Consultant Posts</h2>
      <ul className="space-y-2 text-gray-600">
        <li>Clinical Director - Mid and South Essex NHS Foundation Trust</li>
        <li>Lead Surgeon - South Essex Breast Screening</li>
        <li>Consultant Oncoplastic Breast and General Surgeon- based at Southend Hospital of Mid and South Essex NHS Foundation Trust</li>
      </ul>
    </div>
  );
}