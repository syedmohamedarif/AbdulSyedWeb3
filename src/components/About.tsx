import React from 'react';
import Container from './ui/Container';

export default function About() {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          <div className="lg:w-1/2">
            <img
              src= 'src/assets/half.jpg'
              alt="Doctor in consultation"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Dr. Smith
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              With over 20 years of experience in medical practice, Dr. Smith is dedicated to 
              providing exceptional care using the latest medical advancements and techniques.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-900 pl-4">
                <h3 className="font-bold text-xl mb-2">Education</h3>
                <p className="text-gray-600">Harvard Medical School</p>
              </div>
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
                <p className="text-gray-600">English, Spanish</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}