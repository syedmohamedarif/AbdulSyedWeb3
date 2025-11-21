import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Container from '../ui/Container';
import Button from '../ui/Button';
import MobileMenu from '../ui/MobileMenu';
import { NAV_LINKS } from '../../utils/constants';

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleScheduleClick = () => {
    if (!isHomePage) {
      navigate('/#book-appointment');
    } else {
      const element = document.getElementById('book-appointment');
      if (element) {
        // Get navigation bar height dynamically
        const nav = document.querySelector('nav');
        const navHeight = nav ? nav.offsetHeight : 100;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navHeight - 20; // Extra 20px padding
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    if (!isHomePage) {
      navigate('/');
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const scrollToSection = (targetId?: string) => {
    if (!targetId) return;
    
    if (!isHomePage) {
      // Navigate to home with hash, HomePage will handle scrolling
      if (targetId === 'home') {
        navigate('/');
      } else {
        navigate(`/#${targetId}`);
      }
    } else {
      // Already on home page, just scroll
      if (targetId === 'home') {
        scrollToTop();
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const nav = document.querySelector('nav');
          const navHeight = nav ? nav.offsetHeight : 100;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight - 20;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    targetId?: string
  ) => {
    if (targetId) {
      event.preventDefault();
      scrollToSection(targetId);
    }
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <Container>
          <div className="flex justify-between items-center py-4">
            <Link
              to="/"
              className="text-left focus:outline-none"
            >
              <div className="text-2xl font-bold text-blue-900 hover:text-blue-700 transition-colors">
                Mr Abdul Syed
              </div>
              <div className="text-s text-blue-800 hover:text-blue-600 transition-colors">
                Abdul Hameed Nainoor Ambulingan Kader Syed
              </div>
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {NAV_LINKS.map((link) => {
                if (link.targetId === undefined) {
                  // Regular route link
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      className="text-gray-600 hover:text-blue-900"
                    >
                      {link.label}
                    </Link>
                  );
                }
                // Anchor link
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-600 hover:text-blue-900"
                    onClick={(event) => handleNavClick(event, link.targetId)}
                  >
                    {link.label}
                  </a>
                );
              })}
              <Button onClick={handleScheduleClick}>Book Appointment</Button>
            </div>
          </div>
        </Container>
      </nav>
      
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        onScheduleClick={handleScheduleClick}
        onNavigate={scrollToSection}
      />
    </>
  );
}