import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import Container from './ui/Container';
import Button from './ui/Button';
import { CONTACT_INFO } from '../utils/constants';

export default function Contact() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Contact Us
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            We're here to help and answer any questions you might have
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <Phone className="w-12 h-12 text-blue-900 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-gray-600">{CONTACT_INFO.phone}</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <Mail className="w-12 h-12 text-blue-900 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-600">{CONTACT_INFO.email}</p>
          </div>
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg text-center">
            <MapPin className="w-12 h-12 text-blue-900 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-gray-600">{CONTACT_INFO.address}</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center md:text-left">
            Send us a Message
          </h3>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="First Name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <input
              type="email"
              placeholder="Email"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
            <textarea
              placeholder="Message"
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-900 md:col-span-2"
              rows={4}
            ></textarea>
            <Button 
              type="submit"
              className="w-full md:col-span-2"
            >
              Send Message
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
}