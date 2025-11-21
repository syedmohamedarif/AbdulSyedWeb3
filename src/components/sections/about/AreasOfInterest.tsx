import { Award } from 'lucide-react';
import { type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface PublicationsProps extends HTMLAttributes<HTMLDivElement> {}

export default function AreasOfInterest({ className, ...props }: PublicationsProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-8", className)} {...props}>
      <div className="flex items-center mb-6">
        <Award className="w-8 h-8 text-blue-900 mr-4" />
        <h2 className="text-2xl font-bold">Areas of Interest</h2>
      </div>
      <ul className="space-y-4 text-gray-600">
        <li>Specialist in the diagnosis and management of breast cancer</li>
        <li>One Stop Breast Service</li>
        <li>Oncoplastic Breast Surgery</li>
        <li>Breast problems of any nature (NON COSMETIC)</li>
        <li>Benign or cancerous</li>
        <li>Immediate & delayed breast reconstructions</li>
        <li>Symmetrisation surgery in patients with breast cancer</li>
        <li>Patients with Family History of Breast Cancer & Risk-Reducing Surgery</li>
        <li>Benign breast conditions</li>
        <li>Male breast cancer & lumps</li>
        <li>One-Step Sentinel Node Sampling and Intra-operative Sentinel Node Sampling </li>
        <li>Gall Stones</li>
        <li>Laproscopy</li>
        <li>Hernia</li>
        <li>Lumps and Bumps - lesions (incl. lesions on the head and neck)</li>
      </ul>
    </div>
  );
}