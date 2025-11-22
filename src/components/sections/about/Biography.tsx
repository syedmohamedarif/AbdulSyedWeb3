import { type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface BiographyProps extends HTMLAttributes<HTMLDivElement> {}

export default function Biography({ className, ...props }: BiographyProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-8", className)} {...props}>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        As a Consultant Surgeon with over nine years of experience, I specialise in Oncoplastic Breast Surgery, dedicating my career to delivering high-quality comprehensive breast care services.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        My NHS practice is focused on providing exceptional outpatient services and performing surgeries at Southend University Hospital. I also support the plastic surgery unit at Broomfield Hospital, particularly for patients in need of reconstructive breast surgeries.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        My private practice is based at Spire Wellesley Hospital on Mondays, at Rivers Hospital on Wednesdays and Fridays.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        Over the course of my career, I have successfully performed more than 1,500 breast cancer surgeries. These include a wide range of procedures such as wide local excision of breast cancer, axillary nodal biopsy and clearances, simple and skin sparing mastectomy, with and without immediate implant reconstruction, as well as benign breast surgeries. My private practice is based at Spire Wellesley Hospital on Mondays, at Rivers Hospital on Wednesdays and Fridays.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
      In my current role, I serve as the Clinical Director of Mid and South Essex breast services.     
      </p>

    </div>
  );
}