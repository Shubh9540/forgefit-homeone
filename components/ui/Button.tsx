import React from 'react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface ButtonProps {
  text: string;
  url?: string;
  onClick?: () => void;
  className?: string;
  showIcon?: boolean;
  withSideLines?: boolean;
}

export const Button = ({ 
  text, 
  url, 
  onClick, 
  className = '', 
  showIcon = true,
  withSideLines = false
}: ButtonProps) => {
  // The button has a primary orange background, a black left border, 
  // and turns full black on hover as requested.
  const baseClasses = `bg-[var(--color-primary)] hover:bg-[#1a1a1a] text-white px-8 py-4 font-bold flex items-center justify-center gap-3 transition-colors duration-300 border-l-[6px] border-[#1a1a1a] w-fit ${className}`;

  const content = (
    <>
      {text}
      {showIcon && <FaArrowRight className="text-sm" />}
    </>
  );

  const buttonElement = url ? (
    <Link href={url} className={baseClasses}>
      {content}
    </Link>
  ) : (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );

  if (withSideLines) {
    return (
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-5xl mx-auto">
        <div className="flex-1 h-[2px] bg-[var(--color-primary)] max-w-[40px] md:max-w-[120px]" />
        {buttonElement}
        <div className="flex-1 h-[2px] bg-[var(--color-primary)] max-w-[40px] md:max-w-[120px]" />
      </div>
    );
  }

  return buttonElement;
};
