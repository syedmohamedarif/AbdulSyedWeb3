import Container from '../ui/Container';
import { NAV_LINKS, CONTACT_INFO, CONTACT_INFO2 } from '../../utils/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-900 text-white">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mr Abdul Syed</h3>
            <p className="text-gray-300">
              Providing exceptional medical care with compassion and expertise.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Rivers Hospital</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{CONTACT_INFO2.address}</li>
              <li>Phone: {CONTACT_INFO2.phone}</li>
              <li>Email: {CONTACT_INFO2.email}</li>
              <li>Hours: {CONTACT_INFO2.hours}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Spire Wellesley Hospital</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{CONTACT_INFO.address}</li>
              <li>Phone: {CONTACT_INFO.phone}</li>
              <li>Email: {CONTACT_INFO.email}</li>
              <li>Hours: {CONTACT_INFO.hours}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {currentYear} Mr Abdul Syed. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}