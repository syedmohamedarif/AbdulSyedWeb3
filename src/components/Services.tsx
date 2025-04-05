import React from 'react';
import { Stethoscope, Users, ClipboardCheck, Activity } from 'lucide-react';
import Container from './ui/Container';

const services = [
  {
    icon: <Stethoscope className="w-12 h-12 text-blue-900" />,
    title: "Comprehensive Examinations",
    description: "No need for a General Practioner referral"
  },
  {
    icon: <Users className="w-12 h-12 text-blue-900" />,
    title: "Patient Consultation",
    description: "All investigations at first appointment, including biopsy* if required"
  },
  {
    icon: <ClipboardCheck className="w-12 h-12 text-blue-900" />,
    title: "Treatment Planning",
    description: "Personalized treatment strategies tailored to your specific needs."
  },
  {
    icon: <Activity className="w-12 h-12 text-blue-900" />,
    title: "Follow-up Care",
    description: "Comprehensive post-treatment support and monitoring."
  }
];

export default function Services() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Comprehensive medical care tailored to your needs
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}