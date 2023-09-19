'use client'

import React from 'react'
import { IconType } from 'react-icons'
import { Be_Vietnam_Pro } from "next/font/google"

interface CatgoryInputProps {
  icon: IconType;
  label: string;
  selected: boolean;
  onClick: (value: string) => void;
}

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '400'
})

const CategoryInput: React.FC<CatgoryInputProps> = ({ icon: Icon, label, selected, onClick}) => {
  return (
    <div onClick={() => onClick(label)} className={`rounded-lg border-[1.5px] p-5 flex flex-col items-center justify-center gap-3 hover:border-[#202020] transition cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`}>
      <Icon size={30}  />
      <div className={`font-medium ${beVietnamPro.className}`}>
        {label}
      </div>
    </div>
  )
}

export default CategoryInput