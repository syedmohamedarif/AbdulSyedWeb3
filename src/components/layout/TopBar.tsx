import React from 'react';
import { Phone, Clock, MapPin } from 'lucide-react';
import Container from '../ui/Container';
import { CONTACT_INFO } from '../../utils/constants';

export default function TopBar() {
  // Google Maps URLs
  const hospitalLinks = {
    spireWellesley: 'https://www.google.com/maps/search/?api=1&query=Spire+Wellesley+Hospital+Eastern+Avenue+Southend-on-Sea+SS2+4XH+United+Kingdom',
    rivers: 'https://www.google.com/maps/search/?api=1&query=Rivers+Hospital+High+Wych+Rd+Sawbridgeworth+CM21+0HH+United+Kingdom'
  };

  return (
    <div className="bg-blue-900 text-white py-2">
      <Container>
        {/* Desktop View */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Phone size={16} className="shrink-0" />
            <span className="text-sm lg:text-base">{CONTACT_INFO.phone}</span>
          </div>
          
          <div className="flex items-center space-x-2 mx-auto">
            <Clock size={16} className="shrink-0" />
            <span className="text-sm lg:text-base">{CONTACT_INFO.hours}</span>
          </div>
          
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="shrink-0" />
              <a 
                href={hospitalLinks.spireWellesley} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm lg:text-base hover:underline"
              >
                Spire Wellesley Hospital
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} className="shrink-0" />
              <a 
                href={hospitalLinks.rivers} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm lg:text-base hover:underline"
              >
                Rivers Hospital
              </a>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <div className="flex flex-col items-center space-y-1 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <Phone size={14} className="shrink-0" />
              <span>{CONTACT_INFO.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={14} className="shrink-0" />
              <span>{CONTACT_INFO.hours}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={14} className="shrink-0" />
              <a 
                href={hospitalLinks.spireWellesley} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Spire Wellesley Hospital
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={14} className="shrink-0" />
              <a 
                href={hospitalLinks.rivers} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Rivers Hospital
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}