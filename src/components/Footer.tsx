import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mr Abdul Syed</h3>
            <p className="text-gray-300">
              Providing exceptional medical care with compassion and expertise.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Consultations</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Treatments</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Follow-up Care</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Resources</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Medical Center Drive</li>
              <li>Suite 100</li>
              <li>(555) 123-4567</li>
              <li>info@drsmith.com</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Mr Abdul Syed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}