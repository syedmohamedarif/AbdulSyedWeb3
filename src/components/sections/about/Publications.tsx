import { Award } from 'lucide-react';
import { type HTMLAttributes } from 'react';
import { cn } from '../../../utils/cn';

interface PublicationsProps extends HTMLAttributes<HTMLDivElement> {}

export default function Publications({ className, ...props }: PublicationsProps) {
  return (
    <div className={cn("bg-white rounded-lg shadow-lg p-8", className)} {...props}>
      <div className="flex items-center mb-6">
        <Award className="w-8 h-8 text-blue-900 mr-4" />
        <h2 className="text-2xl font-bold">Publications</h2>
      </div>
      <ul className="space-y-4 text-gray-600">
        <li>Published a book on the “Applied Anatomy for the FRCA” printed by CRC Press, Taylor and Francis Group</li>
        <li>Evaluation of the correlation between Ki-67 proliferative index and the histopathological grade of invasive neoplasms in early breast cancer aged less than 70 years of age: a review of 300 cases. Medical Research Journal</li>
        <li>Role of our Emergency Surgical Ambulatory Clinic in Covid-19 Pandemic, Ann Clin Surg</li>
        <li>An evaluation of rates of breast re excision in patients undergoing breast conserving surgery with adjuvant radiotherapy for breast cancer. European Surgical of Oncology.</li>
        <li>Do modern methods of post-mastectomy immediate breast reconstruction for breast cancer delay adjuvant therapy? , Glob Surgery</li>
        <li>Role of axillary ultrasound for early breast cancer in the era of Z0011: Time to redefine? . DOI: 10.5603/MRJ.2018.0014 Medical Research Journal</li>
        <li>Validation of Memorial Sloan Kettering Cancer Center Nomogram to detect non-sentinel lymph node metastases in a United Kingdom cohort. G.Chir 2018 DOI: 10.11138/gchir/2018.39.1.012. II Gionarle di. Chirurgia</li>
      </ul>
    </div>
  );
}