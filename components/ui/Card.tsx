import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  hoverable = false,
  padding = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`
      bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden
      ${hoverable ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-300' : ''}
      ${paddingClasses[padding]}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;