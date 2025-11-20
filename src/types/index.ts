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

// Review Types
export interface Review {
  id?: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  approved: boolean;
  created_at?: string;
  updated_at?: string;
}