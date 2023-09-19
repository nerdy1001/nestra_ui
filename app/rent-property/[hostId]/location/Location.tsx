'use client'

import React, { useState } from 'react'
import { Be_Vietnam_Pro } from "next/font/google"
import { useRouter } from 'next/navigation'

import { SafeUser } from '@/app/types'
import { useDispatch, useSelector } from 'react-redux'
import { setLocation } from '@/app/reducers/property/propertySlice'

interface LocationProps {
  currentUser? : SafeUser | null
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

const Location: React.FC<LocationProps> = ({ currentUser }) => {

  const location = {
    address: '',
    city: ''
  }

  const router = useRouter()
  const dispatch = useDispatch()
  const { city, address } = useSelector((state: any) => state.property)

  const [locationData, SetLocationData] = useState(location)
  
  const onNext = () => {
    dispatch(setLocation(locationData))
    router.push(`/rent-property/${currentUser?.id}/options`)
  }

  const onBack = (e: any) => {
    e.preventDefault()
    router.push(`/rent-property/${currentUser?.id}/about-property`)
  }

  console.log(locationData)

  return (
    <div className='max-w-screen-xl mx-auto py-[200px] md:pt-[350px] lg:pt-[200px] flex flex-col gap-8 justify-center items-center'>
      <h1 className={`${SubHeading.className} md:text-[30px] text-[28px] text-body text-center`}>
        Where is the property located ?
      </h1>
      <div className='md:w-[80%] xl:w-[50%] w-[100vw] flex flex-col px-10 gap-3'>
        <div className='w-full'>
          <input defaultValue={city} onChange={(e: any) => SetLocationData({ ...locationData, address: e.target.value })} required placeholder='Address' type="text" className='peer w-full p-4 pt-4 font-light border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black bg-white border-neutral-300 pl-4' />
        </div>
        <div className='w-full'>
          <input defaultValue={address} onChange={(e: any) => SetLocationData({ ...locationData, city: e.target.value })} required placeholder='City' type="text" className='peer w-full p-4 pt-4 font-light border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black bg-white border-neutral-300 pl-4' />
        </div>
      </div>
      <div className='flex justify-between items-center w-full py-5 md:px-[100px] px-5 fixed bottom-0 z-10 bg-[#f5f5f5]'>
        <button onClick={onBack} className={`rounded-lg border-[1.5px] border-[#202020] text-md bg-[#f5f5f5] transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-slate-900 to-gray-700 hover:text-white text-body px-6 py-3 ${Subtitle.className}`}>
          Back
        </button>
        <button onClick={onNext} className={`rounded-lg text-md transition duration-500 ease-in-out bg-[#3AB0FF] hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-[#3AB0FF] to-blue-500 text-white px-6 py-3 ${Subtitle.className}`}>
          Next
        </button>
      </div>
    </div>
  )
}

export default Location