import { GraduationCap } from 'lucide-react';
import { type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface QualificationsProps extends HTMLAttributes<HTMLDivElement> {}

export default function Qualifications({ className, ...props }: QualificationsProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-8", className)} {...props}>
      <div className="flex items-center mb-6">
        <GraduationCap className="w-8 h-8 text-blue-900 mr-4" />
        <h2 className="text-2xl font-bold">Qualifications</h2>
      </div>
      <ul className="space-y-4 text-lg-gray-600">
        <li>Bachelor of Medicine and Bachelor of Surgery (MBBS), Stanley Medical College, India, 1999</li>
        <li>Membership of the Royal College of Surgeons of Edinburgh (MRCSEd), Royal College of Surgeons of Edinburgh, 2005</li>
        <li>Fellowship of Royal College of Surgeons (FRCS), InterCollegiate Specialty Examination, 2012</li>
      </ul>
    </div>
  );
}