'use client'
import React, { useCallback, useEffect } from 'react'
import { Be_Vietnam_Pro } from "next/font/google"

import { CommentType, SafeUser } from '@/app/types'
import Avatar2 from '../Avatar2';
import { useRouter } from 'next/navigation';
import Heading from '../Heading';
import useDescriptionModal from '@/app/hooks/useDescriptionModal';
import { extraFeesParams, pricingParams } from '@prisma/client';
import AmenityBox from '../AmenityBox'
import CommentSection from '../CommentSection'


interface PropertyInformationProps {
    propertyId: string;
    user: SafeUser;
    description: string;
    category: string
    location: string
    title: string
    pricing: pricingParams[]
    extraFees: extraFeesParams[]
    amenities: string[]
    houseRules: string;
    houseArrangement: string;
    currentUser: SafeUser | null | undefined
    landlord: string;
    comment: CommentType[]
}


const beVietnamPro = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
})

const beVietnamPro400 = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '600'
})

const PropertyInformation: React.FC<PropertyInformationProps> = ({
    user,
    description,
    category,
    amenities,
    extraFees,
    title,
    pricing,
    houseRules,
    houseArrangement,
    propertyId,
    comment,
    landlord,
    currentUser
}) => {

    const router = useRouter()
    const descriptionModal = useDescriptionModal()

    localStorage.setItem('description', description)

    const viewDescription = useCallback(() => {
        descriptionModal.onOpen()
    }, [descriptionModal]) 

  return (
    <>
    <div className='col-span-2 flex flex-col mb-10'>
        <div className='flex flex-col gap-10'>
            <div onClick={() => router.push(`/user_profile/${user.id}`)} className='flex flex-row items-center justify-between gap-5 cursor-pointer'>
                <div className='flex flex-col gap-2'>
                    <div className='text-xl flex flex-row items-center gap-2'>
                        <div className='flex text-xl md:text-xl flex-row items-center gap-2 tracking-wide'>
                            {`${category === 'Family' || 'Student' ? `${category} home`  : `${category}`}`} rented out by {`${user?.name !== null ? `${user?.name.split(' ', 1)}` : `${user?.firstName}`}`}
                        </div>
                    </div>
                </div>
                <Avatar2 src={user?.image}  />
            </div>
            <hr />
            <div className='flex flex-col gap-3'>
                <div className='text-md mb-3'>
                    <Heading title={`About ${title}`} />
                </div>
                <div className={`text-[#202020] tracking-wide text-md`}>
                    {
                        description.length > 400 ? (
                            <>
                                <div className={`${beVietnamPro.className}`}>
                                    {`${description.substring(0, 400)}...`}
                                </div>
                                <div className={`text-sm underline cursor-pointer text-[#202020] mt-2 ${beVietnamPro400.className}`} onClick={viewDescription}>
                                    Show more
                                </div>
                            </>
                            ) : (
                            <div>
                                {description}
                            </div>
                        )
                    }
                </div>
            </div>
            <hr />
            <div className='flex flex-col gap-5 tracking-wide '>
                <h1 className='text-xl text-[#202020]'>
                   {`What it has to offer`}
                </h1>
                <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 w-full'>
                    {amenities.map((item) => (
                        <div key={item}>
                            <AmenityBox label={item} />
                        </div>
                    ))}
                </div>
            </div>
            <hr />
            <div className='flex flex-col gap-5 tracking-wide '>
                <h1 className='text-xl text-left'>
                    Arrangement
                </h1>
                <p className={`md:text-md text-[#202020] leading-8 ${beVietnamPro.className}`}>
                    {houseArrangement}
                </p>
            </div>
            <hr />
            <div className='flex flex-col gap-5 tracking-wide '>
                <h1 className='text-xl text-left'>
                    Rules
                </h1>
                <p className={`md:text-md text-[#202020] leading-8 ${beVietnamPro.className}`}>
                    {houseRules}
                </p>
            </div>
            <hr />
            <div className='flex flex-col gap-5 tracking-wide '>
                <h1 className='text-xl text-left'>
                    {comment.length} Comments
                </h1>
                <CommentSection currentUser={currentUser?.id} landlord={landlord} comment={comment} propertyId={propertyId} />
            </div>
        </div>
    </div>
    <div className='col-span-1 flex flex-col tracking-wide'>
        <div className=' hidden md:w-full md:h-auto bg-[#fefefe] overflow-y-auto md:sticky md:top-[100px] w-full h-[600px] shadow-md border-[1px] border-[#e7e7e7] gap-3 p-[20px] md:flex flex-col rounded-md'>
            <h1 className='text-xl text-left'>
                Rent
            </h1>
            {pricing.map((item: any) => (
            <div key={item.id} className='flex flex-row items-center md:justify-between gap-5 md:gap-10'>
                <div className='flex flex-col gap-3 truncate text-neutral-500'>
                    <p className={`md:text-[13px] text-sm ${beVietnamPro.className}`}>
                        {item.unitType}
                    </p>
                </div>
                <div className='flex flex-row truncate items-center gap-3'>
                    <p className={`md:text-[14px] text-sm text-[#000000] ${beVietnamPro400.className}`}>
                        XAF {item.price} {item.rentalPeriod}
                    </p>
                </div>
            </div>
            ))}
            <hr />
            <h1 className='text-xl text-left'>
                { extraFees.length > 0 ? 'Extra fees' : null }
            </h1>
            {extraFees.map((item: any) => (
            <div key={item.id} className='flex flex-row items-center md:justify-between gap-5 md:gap-10'>
                <div className='flex flex-col gap-3 text-neutral-500 truncate'>
                    <p className={`md:text-[13px] text-sm ${beVietnamPro.className}`}>
                        {item.feeName}
                    </p>
                </div>
                <div className='flex flex-row items-center gap-3 truncate'>
                    <p className={`md:text-[14px] truncate text-sm text-[#000000] ${beVietnamPro400.className}`}>
                        XAF {item.amount}
                    </p>
                </div>
            </div>
            ))}
            { extraFees.length > 0 ? <hr /> : null }
            <div className='mt-3'>
                <button onClick={() => router.push(`/contact_landlord/${user.id}`)} className='w-full bg-[#3AB0FF] text-white p-3 rounded-md'>
                    Reserve
                </button>
            </div>
        </div>
    </div>
    </>
  )
}

export default PropertyInformation