import { Stethoscope } from 'lucide-react';
import { type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface SpecialistProps extends HTMLAttributes<HTMLDivElement> {}

export default function Specialist({ className, ...props }: SpecialistProps) {
  return (
    <div className={cn("bg-white p-6 rounded-lg shadow-lg", className)} {...props}>
      <Stethoscope className="w-12 h-12 text-blue-900 mb-4" />
      <h2 className="text-xl font-bold mb-4">Specialist in</h2>
      <ul className="space-y-2 text-gray-600">
        <li>Axillary clearance</li>
        <li>Benign breast problems</li>
        <li>Breast cancer</li>
        <li>Breast lump investigation</li>
        <li>Skin sparing mastectomies</li>
        
      </ul>
    </div>
  );
}