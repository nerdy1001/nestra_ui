'use client'

import { useRouter } from 'next/navigation'

import React from 'react'
import Image from 'next/image'

import Heading from './Heading'
import Button from './Button'
import empty from '../../public/images/empty3.svg'


interface EmptyStateProps {
    title?: string
    subtitle?: string
    showReset?: boolean
    returnToHome?: boolean
}


const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    subtitle,
    showReset,
    returnToHome
}) => {

    const router = useRouter()

  return (
    <div className='h-[75vh] pt-[150px] flex flex-col gap-2 justify-center items-center'>
        <Image src={empty} alt='' height={150} width={150} />
        <div className='pt-10'>
            <Heading center title={title} subtitle={subtitle} />
        </div>
        <div className='w-48 mt-4'>
            {showReset && (
                <Button small outline label='Remove all filters' onClick={() => router.push('/')} />
            )} 
            {returnToHome && (
                <Button small label='Return to home page' onClick={() => router.push('/')} />
            )} 
        </div>
    </div>
  )
}

export default EmptyState