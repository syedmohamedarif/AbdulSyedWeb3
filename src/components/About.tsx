import React from 'react';
import Container from './ui/Container';

export default function About() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="lg:w-1/2">
            <img
              src= '/images/half.jpg'
              alt="Abdul Syed - Best Breast Surgeon in UK and Essex providing expert consultation"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Mr Abdul Syed - Best Breast Surgeon in UK
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              As one of the best breast surgeons in the UK and a leading breast surgeon in Essex, Mr Abdul Syed is dedicated to 
              providing exceptional breast care using the latest oncoplastic surgical techniques and advancements.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-900 pl-4">
                <h3 className="font-bold text-xl mb-2">Experience</h3>
                <p className="text-gray-600">20+ Years Practice</p>
              </div>
              <div className="border-l-4 border-blue-900 pl-4">
                <h3 className="font-bold text-xl mb-2">Certifications</h3>
                <p className="text-gray-600">Board Certified</p>
              </div>
              <div className="border-l-4 border-blue-900 pl-4">
                <h3 className="font-bold text-xl mb-2">Languages</h3>
                <p className="text-gray-600">English</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}