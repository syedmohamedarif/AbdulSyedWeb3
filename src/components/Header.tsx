//import React from 'react';
import { Phone, Clock, MapPin } from 'lucide-react';

export default function Header() {
  return (
    <header>
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone size={16} />
              <span>01245 400993</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={16} />
            <span>Eastern Avenue Southend-on-Sea SS2 4XH</span>
          </div>
        </div>
      </div>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-blue-900">Mr Abdul Syed</div>
            <div className="space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-900">Home</a>
              <a href="#about" className="nav-link">About</a>

              <a href="about" className="nav-link text-gray-600 hover:text-blue-900">About</a>
              <a href="#" className="text-gray-600 hover:text-blue-900">Services</a>
              <a href="#" className="text-gray-600 hover:text-blue-900">Contact</a>
              <button className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}