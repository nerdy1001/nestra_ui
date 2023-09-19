'use client'

import { FC } from 'react'
import { Be_Vietnam_Pro } from "next/font/google"

interface AmenityBoxProps {
  label: string
}

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
  })

const AmenityBox: FC<AmenityBoxProps> = ({ label }) => {
  return (
    <div className='rounded-full border-[1.5px] px-6 py-3 flex flex-col items-center justify-center gap-3 transition cursor-pointer border-[#202020]'>
        <p className={`${beVietnamPro.className} truncate text-[14px]`}>
          {label}
        </p>
    </div>
  )
}

export default AmenityBox