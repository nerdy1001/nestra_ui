'use client'
import React from 'react'
import { IconType } from 'react-icons';

interface ButtonProps {
    label?: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    rentModal?: boolean;
    icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, outline, small, rentModal, icon: Icon }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`relative disabled:opacity-70 disabled:cursor-not-allowed text-sm md:text-lg rounded-lg hover:opacity-80 transition w-full ${outline ? 'bg-white' : 'bg-[#46bccc]'} ${rentModal ? 'bg-gradient-to-r from-[#3AB0FF] to-blue-500' : 'bg-[#46bccc]'} ${outline ? 'border-black' : 'border-none'} ${outline ? 'text-[#202020]' : 'text-white'} ${small ? 'py-[12px]' : 'py-4'} ${small ? 'text-sm md:text-md' : 'text-md'} ${small ? 'font-light' : 'font-semibold'} ${small ? 'border-[1.5px]' : 'border-[1px]'}`}>
        {Icon && (
          <Icon size={24} className='absolute left-4 top-3' />
        )}
        {label}
    </button>
  )
}

export default Button