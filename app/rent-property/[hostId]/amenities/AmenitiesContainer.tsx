'use client'

import React, { useState } from 'react'
import Amenity from './Amenity'
import { amenities } from '../../../constants/amenitiesList'

import { useRouter } from 'next/navigation'
import { Be_Vietnam_Pro } from "next/font/google"
import { SafeUser } from '@/app/types'
import { useDispatch } from 'react-redux'
import { addAmenity, removeAmenity } from '@/app/reducers/property/propertySlice'

interface AmenitiesContainerProps {
  currentUser?: SafeUser | null
}

const Heading = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '700'
})

const SubHeading = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '500'
})

const Subtitle = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '400'
})

const AmenitiesContainer: React.FC<AmenitiesContainerProps> = ({ currentUser }) => {

  const router = useRouter()
  const dispatch = useDispatch()

  const [selectedAmenities, setSelectedAmenities] = useState([''])

  const handleSelect = (amenity: string) => {
    const isSelected = selectedAmenities.find((element) => element === amenity)

    if (isSelected) {
      selectedAmenities.filter((element) => element !== amenity)
      dispatch(removeAmenity(amenity))
    } else {
      selectedAmenities.push(amenity)
      dispatch(addAmenity(amenity))
    }
    console.log(selectedAmenities)
  }

  return (
    <div className='max-w-screen-xl py-[100px] md:pt-[100px] lg:pt-[100px] flex flex-col gap-3 justify-center items-center'>
      <h1 className={`${SubHeading.className} md:text-[30px] text-[28px] text-body text-center`}>
        What does your property have to offer ?
      </h1>
      <p className='text-sm text-zinc-500'>
        You can always add more later
      </p>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-3 overflow-y-auto'>
        {amenities.map((item) => (
          <div key={item.label} className='col-span-1'>
            <Amenity onClick={(amenity) => handleSelect(amenity)} key={item.label} label={item.label} icon={item.icon} />
          </div>
        ))}
      </div>
      <div className='flex justify-between items-center w-full py-5 md:px-[100px] px-5 fixed bottom-0 z-10 bg-[#f5f5f5]'>
        <button onClick={() => router.push(`/rent-property/${currentUser?.id}/options`)} className={`rounded-lg border-[1.5px] border-[#202020] text-md bg-[#f5f5f5] transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-slate-900 to-gray-700 hover:text-white text-body px-6 py-3 ${Subtitle.className}`}>
          Back
        </button>
        <button onClick={() => router.push(`/rent-property/${currentUser?.id}/photos`)} className={`rounded-lg text-md transition duration-500 ease-in-out bg-[#3AB0FF] hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-[#3AB0FF] to-blue-500 text-white px-6 py-3 ${Subtitle.className}`}>
          Next
        </button>
      </div>
    </div>
  )
}

export default AmenitiesContainer