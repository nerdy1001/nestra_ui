'use client'

import { SafeUser } from '@/app/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Be_Vietnam_Pro } from "next/font/google"
import { toast } from 'react-hot-toast'

import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { resetReducer } from '@/app/reducers/property/propertySlice'

interface FinishListingProps {
  currentUser: SafeUser | null
}
  
const subHeading = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '500'
})
  
const Subtitle = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '300'
})


const FinishListing: FC<FinishListingProps> = ({ currentUser }) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [isPropertySubmitted, setIsPropertySubmitted] = useState()

    const { 
    title, 
    description, 
    city, 
    address, 
    coverPhoto, 
    otherPhotos, 
    IdPhoto, 
    IdCardNumber, 
    amenities, 
    pricing, 
    category, 
    houseRules, 
    houseArrangement,
    extraFees 
  } = useSelector((state: any) => state.property)

  const data = {
    title: title,
    description: description,
    city: city,
    address: address,
    coverPhoto: coverPhoto,
    otherPhotos: otherPhotos,
    IdPhoto: IdPhoto,
    IdCardNumber: IdCardNumber,
    amenities: amenities,
    pricing: pricing,
    category: category,
    houseRules: houseRules,
    houseArrangement: houseArrangement,
    extraFees: extraFees
  }

  console.log(data)

  const onFinish = async () => {

    try {
      const payload = await axios.post('/api/listings', data)

      toast.success('Your property was submitted.')
      console.log(payload.data.id)

      dispatch(resetReducer())
      
      router.push(`/landlord/${payload.data.id}`)

    } catch (error) {
      toast.error('Could not submit. Try again')
    }

    }



  return (
    <div className='max-w-screen-xl pt-[60px] flex md:flex-row flex-col'>
      <div className='h-full w-full flex flex-col'>
        <div className='py-[80px]'>
          <Image height={600} width={600} src='/images/done1.svg' alt='' className='w-full h-full object-cover' />
        </div>
      </div>
      <div className='h-full w-full mx-auto md:pl-[80px] md:pt-[55px]'>
        <div className='flex flex-col gap-2 py-6'>
          <p className={`${subHeading.className} text-[20px] text-body`}>
            Welcome to the finish line
          </p>
          <p className={`${Subtitle.className} text-[17px] text-[#959595]`}>
            Share some basic information about the property like where it is, how long a person can rent it and what makes it desirable. 
          </p>
        </div>
        <hr />
        <div className='flex flex-col gap-2 py-6'>
          <p className={`${subHeading.className} text-[20px] text-body`}>
            How does it look like ?
          </p>
          <p className={`${Subtitle.className} text-[17px] text-[#959595]`}>
            Add a few pictures of the property, give it a title and catchy description.
          </p>
        </div>
        <hr />
        <div className='flex flex-col gap-2 py-6'>
          <p className={`${subHeading.className} text-[20px] text-body`}>
            Finish and publish
          </p>
          <p className={`${Subtitle.className} text-[17px] text-[#959595]`}>
            Name your price, publish and allow your property to become someone&apos;s new home.
          </p>
        </div>
        <hr />
        <div className='mt-[100px] md:mt-0'>
          <div className='w-full fixed md:relative z-10 md:z-0 bottom-0 bg-white py-5 md:pt-[30px]'>
            <button onClick={onFinish} className={`rounded-lg md:text-lg text-md transition ease-in-out delay-100 bg-[#3AB0FF] hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-[#3AB0FF] to-blue-500 duration-100 text-white px-4 py-3 ${Subtitle.className}`}>
              Go to dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinishListing