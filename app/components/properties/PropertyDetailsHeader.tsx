'use client'
import { SafeUser } from '@/app/types';
import React, { useState, useEffect } from 'react'
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

interface PropertyDetailsHeaderProps {
    title: string;
    location: string;
    coverPhoto: string;
    otherPhotos: Array<String>;
    id: string;
    currentUser?: SafeUser | null;
}

const PropertyDetailsHeader: React.FC<PropertyDetailsHeaderProps> = ({
    title,
    location,
    otherPhotos,
    coverPhoto,
    id,
    currentUser
}) => {
  otherPhotos.shift()
  otherPhotos.unshift(coverPhoto)

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const firstSlide = currentIndex === 0
    const newIndex = firstSlide ? otherPhotos.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const lastSlide = currentIndex === otherPhotos.length - 1
    const newIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex)
  }

  const [autoSlide, setAutoSlide] = useState(true)

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(nextSlide, 5000)
    return () => clearInterval(slideInterval)
  }, [nextSlide])

  return (
    <>
        <Heading title={title} subtitle={`${location.split(',', 2).toString()}`} />
        <div className='w-full h-[57vh] bg-[#202020cf] overflow-hidden rounded-lg cursor-pointer relative group'>
          <Image
            alt='details image' 
            onClick={() => setAutoSlide((prevAutoSlide) => !prevAutoSlide)}
            style={{objectFit: 'contain'}}
            fill
            src={`${otherPhotos[currentIndex]}`} 
            className='object-contain w-full h-full' 
          /> 
          <div className='absolute top-5 right-5'>
            <HeartButton propertyId={id} currentUser={currentUser} />
          </div>
          <div className='hover:bg-white hover:scale-110 absolute top-[50%] md:left-20 left-5 text-2xl -translate-x-0 translate-y-[-30%] p-1 rounded-full cursor-pointer bg-[#ffffff97]'>
            <BiChevronLeft onClick={prevSlide} size={20} />
          </div>
          <div className='hover:bg-white hover:scale-110 absolute top-[50%] md:right-20 right-5 text-2xl -translate-x-0 translate-y-[-30%] p-1 rounded-full cursor-pointer bg-[#ffffff97]'>
            <BiChevronRight onClick={nextSlide} size={20} />
           </div>
        </div>
    </>
  )
}

export default PropertyDetailsHeader