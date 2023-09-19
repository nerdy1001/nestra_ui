'use client'

import React from 'react'
import Image from 'next/image'

interface Avatar2Props {
  src: string | null | undefined
}

const Avatar2: React.FC<Avatar2Props> = ({ src }) => {
  return (
    <Image src={src || '/images/profile.png'} className='rounded-full' height='110' width='110' alt='src'/>
  )
}

export default Avatar2