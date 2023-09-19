'use client'

import React from 'react'
import Image from 'next/image'

interface Avatar4Props {
  src: string | null | undefined
}

const Avatar4: React.FC<Avatar4Props> = ({ src }) => {
  return (
    <Image src={src || '/images/profile.png'} className='rounded-full' height='50' width='50' alt='src'/>
  )
}

export default Avatar4