'use client'

import React from 'react'
import { Fredoka } from "next/font/google"

interface MenuItemProps {
    onClick: () => void;
    label: string;
    isTitle?: boolean
}

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: '600'
})

const MenuItems: React.FC<MenuItemProps> = ({ onClick, isTitle, label }) => {
  return (
    <div onClick={onClick} className={`px-4 py-3 hover:bg-neutral-100 transition font-medium ${isTitle && `${fredoka.className}`} ${isTitle && 'block md:hidden text-[#3AB0FF] cursor-pointer text-xl'}`}>
      {label}
    </div>
  )
}

export default MenuItems