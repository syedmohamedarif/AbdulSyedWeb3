import { type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface BiographyProps extends HTMLAttributes<HTMLDivElement> {}

export default function Biography({ className, ...props }: BiographyProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-8", className)} {...props}>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        As a Consultant Surgeon with over nine years of experience, I specialize in Oncoplastic Breast Surgery, dedicating my career to delivering high-quality comprehensive breast care services.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        My practice is focused on providing exceptional outpatient services and performing surgeries at Southend University Hospital. I also support the plastic surgery unit at Broomfield Hospital, particularly for patients in need of reconstructive breast surgeries.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
        Over the course of my career, I have successfully performed more than 1,500 breast cancer surgeries. These include a wide range of procedures such as wide local excision of breast cancer, axillary nodal biopsy and clearances, simple and skin sparing mastectomy, with and without immediate implant reconstruction, as well as benign breast surgeries.
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
      In my current role, I serve as the clinical lead of the breast unit at Southend University Hospital, overseeing operations and ensuring the delivery of top-notch care to our patients.      
      </p>
      <p className="space-y-4 text-lg-gray-600 mb-6">
      Furthermore, I am deeply committed to education and training. I serve as the teaching lead for the Department of Surgery at Southend University Hospital, where I mentor and educate the next generation of surgeons, ensuring the highest standards of patient care and surgical expertise.
      </p>
    </div>
  );
}