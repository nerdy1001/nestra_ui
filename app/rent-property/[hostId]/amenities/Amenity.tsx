'use client'

import React, { useState } from 'react'
import { IconType } from 'react-icons'

interface AmenityProps {
  icon: IconType
  label: string
  onClick: (value: string) => void
}

const Amenity: React.FC<AmenityProps> = ({ label, onClick, icon: Icon }) => {

  const [selected, setSelected] = useState(false)

  return (
    <div onClick={() => {
      onClick(label)
      setSelected((prevState) => !prevState)
      }} className={`rounded-lg border-[1.5px] p-8 flex flex-col items-center justify-center gap-3 hover:border-[#202020] transition cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`}>
      <Icon size={30} />
      <div className='font-medium truncate'>
        {label}
      </div>
    </div>
  )
}

export default Amenity