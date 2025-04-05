import React from 'react';
import { X } from 'lucide-react';
import { NAV_LINKS } from '../../utils/constants';
import Button from './Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onScheduleClick: () => void;
}

export default function MobileMenu({ isOpen, onClose, onScheduleClick }: MobileMenuProps) {
  if (!isOpen) return null;

  const handleScheduleClick = () => {
    onScheduleClick();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-blue-900/95 z-50 lg:hidden">
      <div className="flex flex-col h-full p-6">
        <button 
          onClick={onClose}
          className="self-end text-white p-2"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center justify-center flex-1 space-y-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white text-2xl hover:text-blue-200 transition-colors"
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
          <Button 
            variant="secondary" 
            className="mt-8 w-full max-w-xs"
            onClick={handleScheduleClick}
          >
            Schedule Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}