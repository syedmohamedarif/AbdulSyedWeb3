import { type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface BiographyProps extends HTMLAttributes<HTMLDivElement> {}

export default function Biography({ className, ...props }: BiographyProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-8", className)} {...props}>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        As a Consultant Breast Surgeon with over nine years of experience, I specialise in Oncoplastic Breast Surgery, dedicating my career to delivering high-quality comprehensive breast care services. I am committed to providing exceptional care to patients throughout Essex.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        My NHS practice is focused on providing exceptional outpatient services and performing surgeries at Southend University Hospital. As a leading breast surgeon in Essex, I ensure that all patients receive the highest standard of care.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        My private practice is based at Spire Wellesley Hospital on Mondays, at Rivers Hospital on Wednesdays and Fridays. These locations make me easily accessible as a breast surgeon in Essex, serving patients from Chelmsford and throughout the region.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        Over the course of my career, I have successfully performed more than 1,500 breast surgeries. These include a wide range of procedures such as wide local excision of breast cancer, axillary nodal biopsy and clearances, simple and skin sparing mastectomy, with and without immediate implant reconstruction, as well as benign breast surgeries. This extensive experience has established me as one of the most experienced breast surgeons in Essex.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        In my current role, I serve as the Clinical Director of Mid and South Essex breast services. This leadership position, combined with my track record of over 1,500 successful surgeries, reflects my commitment to excellence as a consultant breast surgeon in Essex. As Abdul Syed breast surgeon, I am dedicated to advancing breast care services and providing outstanding outcomes for all my patients.
      </p>

    </div>
  );
}