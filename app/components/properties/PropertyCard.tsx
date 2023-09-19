'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { Be_Vietnam_Pro } from 'next/font/google';
import { SafeListings, SafeUser } from '@/app/types';
import HeartButton from '../HeartButton';
import { useRouter } from 'next/navigation';
import { IoLocationOutline } from 'react-icons/io5'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

import Button from '../Button';
import Link from 'next/link';


interface PropertyCardProps {
    data: SafeListings
    reservation?: any;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null
};

const heading = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '900'
})

const bold = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '500'
})

const subtitle = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
})



const PropertyCard: React.FC<PropertyCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = " ",
    currentUser
}) => {

    const router = useRouter()
    const address = data.address
    const city = data.city
    const pricing = data.pricing[0]

    data.otherPhotos.shift()
    data.otherPhotos.unshift(data.coverPhoto)

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const firstSlide = currentIndex === 1
        const newIndex = firstSlide ? data.otherPhotos.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const lastSlide = currentIndex === data.otherPhotos.length - 1
        const newIndex = lastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex)
    }

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()

            if(disabled) {
                return
            }

            onAction?.(actionId)
        }, [onAction, actionId, disabled]
    )

    const price = useMemo(() => {
        return data.pricing
    }, [data.pricing])

  return (
    <div className='col-span-1 group bg-[#ffffff] shadow-md rounded-xl h-auto'>
        <div className='flex flex-col gap-2 w-full'>
            <div className='aspect-[4/3] w-full relative overflow-hidden rounded-t-xl group'>
                <img alt='property-for-rent' onClick={() => router.push(`/property/${data.id}`)} src={data.otherPhotos[currentIndex]} className='object-cover cursor-pointer h-full w-full group-hover:scale-110 transition' />
                <div className='absolute top-3 right-3'>
                    <HeartButton propertyId={data.id} currentUser={currentUser} />
                </div>
                <div className='hidden group-hover:block hover:bg-white hover:scale-110 absolute top-[50%] left-3 text-2xl -translate-x-0 translate-y-[-30%] p-1 rounded-full cursor-pointer bg-[#ffffffde]'>
                    <BiChevronLeft onClick={prevSlide} size={20} />
                </div>
                <div className='hidden group-hover:block hover:bg-white hover:scale-110 absolute top-[50%] right-3 text-2xl -translate-x-0 translate-y-[-30%] p-1 rounded-full cursor-pointer bg-[#ffffffde]'>
                    <BiChevronRight onClick={nextSlide} size={20} />
                </div>
            </div>
            <Link href={`/property/${data.id}`}>
                <div className='cursor-pointer p-[10px]'>
                    <button className='bg-[#3ab0ff1d] p-[6px] text-[#3AB0FF] text-xs rounded-md'>
                        {data.category}
                    </button>
                    <div className={`font-bold text-md ${heading} mt-[10px]`}>
                        {data.title}
                    </div>
                    <div className={`font-light text-[#959595] truncate flex flex-row items-center gap-1 my-[6px] ${subtitle.className}`}>
                        <IoLocationOutline />
                        {address}, {city}
                    </div>
                    <div className='flex flex-row gap-1 items-center w-full'>
                        <p className={`text-lg text-[#000000] ${bold.className}`}>
                            XAF {pricing.price}
                        </p>
                        <p className='text-sm text-[#232323]'>
                            {pricing.rentalPeriod}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
        {onAction && actionLabel && (
            <Button outline={false} disabled={disabled} small label={actionLabel} onClick={handleCancel} />
        )}
    </div>
  )
}

export default PropertyCard