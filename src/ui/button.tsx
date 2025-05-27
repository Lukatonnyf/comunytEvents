"use client";
import { useState } from "react";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string | undefined;

  // buttons?: {
  //   className: string | undefined;
  //   text: React.ReactNode | string;
  //   onClick?: () => void;
  // }[];
  // className?: string;
}

// Import the Poppins font from next/font/google or define it accordingly
import { Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

const Button = ({ children, onClick, className = '' }: ButtonProps) => {
  const [onMouse, setOnMouse] = useState(false);
  return (

    <button
      onClick={onClick}
      className={`
         ${poppins.className} font-medium
        text-start text-sm   rounded-3xl origin-left scale-y-[0.95]
              py-3 px-7 bg-tertiary
              sm:py-3 sm:px-5  sm:flex sm:justify-center sm:items-center sm:text-sm
              transition-all duration-300 hover:-translate-y-[2px]
      ${onMouse ? 'shadow-lg -translate-y-2' : ''}
      ${className}`}
      onMouseEnter={() => setOnMouse(true)}
      onMouseLeave={() => setOnMouse(false)}>
      {children}
    </button >


  )
}

export default Button;
