// Navigation Types
export interface NavLink {
  href: string;
  label: string;
}

// UI Component Types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Service Types
export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}