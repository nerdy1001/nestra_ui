'use client'

import React from 'react'
import Image from 'next/image'
import { AiFillStar } from 'react-icons/ai'

interface Avatar3Props {
  src: string | null | undefined
}

const Avatar3: React.FC<Avatar3Props> = ({ src }) => {
  const isActive = true

  return (
    <div className='relative'>
      <Image src={src || '/images/profile.png'} className='relative rounded-full' height='95' width='95' alt='src'/>
      { isActive ? (
        <AiFillStar className='absolute block rounded-full bg-[#3AB0FF] text-white ring-2 ring-white top-0 right-10 p-[1px] h-2 w-2 md:h-5 md:w-5' />
      ) : null }
    </div>
  )
}

export default Avatar3