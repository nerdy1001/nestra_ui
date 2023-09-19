'use client'

import React from 'react'
import Image from 'next/image'

interface AvatarProps {
  src: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image src={src || '/images/profile.png'} className='rounded-full' height='25' width='25' alt='src'/>
  )
}

export default Avatar