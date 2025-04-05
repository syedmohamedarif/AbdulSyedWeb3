import { BookOpen } from 'lucide-react';
import { type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface ResearchInterestsProps extends HTMLAttributes<HTMLDivElement> {}

export default function ResearchInterests({ className, ...props }: ResearchInterestsProps) {
  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-lg", className)} {...props}>
      <BookOpen className="w-12 h-12 text-blue-900 mb-4" />
      <h2 className="text-xl font-bold mb-4">Research Interests</h2>
      <ul className="space-y-2 text-gray-600">
        <li>Mastectomy with immediate breast reconstruction</li>
        <li>Axillary Surgery after chemotherapy</li>
        <li>Hormonal therapy before surgery for ER positive Her2 Negative breast cancer</li>
        <li>Radiological procedure for early stage breast cancer</li>
      </ul>
    </div>
  );
}