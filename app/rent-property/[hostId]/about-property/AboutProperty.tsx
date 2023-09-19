'use client'

import React, { useState } from 'react'
import { Be_Vietnam_Pro } from "next/font/google"
import { useRouter } from 'next/navigation'

import { categories } from '@/app/components/Categories'
import CategoryInput from '@/app/components/inputs/CategoryInput'
import { SafeUser } from '@/app/types'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '@/app/reducers/property/propertySlice'

interface AboutPropertyProps {
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

const AboutProperty: React.FC<AboutPropertyProps> = ({ currentUser }) => {
    
  const router = useRouter()
  const dispatch = useDispatch()

  const [categoryLabel, setCategoryLabel] = useState('');

  const onNext = () => {
    dispatch(setCategory(`${categoryLabel}`))
    router.push(`/rent-property/${currentUser?.id}/location`)
  }

  return (
      <div className='flex flex-col'>
        <div className='max-w-screen-xl mx-auto py-[130px] md:pt-[350px] lg:pt-[200px] gap-8 flex flex-col justify-center items-center'>
          <h1 className={`${SubHeading.className} md:text-[30px] text-[28px] text-body md:text-center text-left`}>
            Which of these best describe your property ?
          </h1>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-3 w-full'>
            {categories.map((item) => (
              <div key={item.label} className='col-span-1'>
                <CategoryInput onClick={() => 
                  setCategoryLabel(item.label)
                } 
                  selected={item.label === categoryLabel} 
                  label={item.label} 
                  icon={item.icon} />
              </div>
            ))}
          </div>
          <div className='flex justify-between items-center w-full py-5 md:px-[100px] px-5 fixed bottom-0 z-10 bg-[#f5f5f5]'>
            <button onClick={() => router.push(`/rent-property/${currentUser?.id}`)} className={`rounded-lg border-[1.5px] border-[#202020] text-md bg-[#f5f5f5] transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-slate-900 to-gray-700 hover:text-white text-body px-6 py-3 ${Subtitle.className}`}>
                Back
            </button>
            <button onClick={onNext} className={`rounded-lg text-md transition duration-500 ease-in-out bg-[#3AB0FF] hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-[#3AB0FF] to-blue-500 text-white px-6 py-3 ${Subtitle.className}`}>
                Next
            </button>
          </div>
        </div>
      </div>
  )
}

export default AboutProperty