'use client'
import React, { useState } from 'react'
import { IconType } from 'react-icons'
import { Be_Vietnam_Pro } from "next/font/google"

export interface AmenityInputProps {
    icon: IconType;
    label: string;
    onClick: (value: string) => void;
}

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
})

const AmenityInput: React.FC<AmenityInputProps> = ({ icon: Icon, label, onClick,}) => {
    const [selected, setSelected] = useState(false)
    const handleClick = (e: any) => {
        onClick(e)
        setSelected((value) => !value)
    }
  return (
    <div onClick={() => handleClick(label)} className={`rounded-xl border-2 p-4 flex flex-col items-center justify-center gap-3 hover:border-[#707070] transition cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`}>
        <Icon size={30}  />
        <div className={`font-semibold ${beVietnamPro.className}`}>
          {label}
        </div>
    </div>
  )
}

export default AmenityInput