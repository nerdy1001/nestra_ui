'use client'

import { Be_Vietnam_Pro } from "next/font/google"
import { ContactUser } from '@/app/types'
import Image from 'next/image'
import { FC } from 'react'
import { formatTimeToNow } from "@/app/libs/utils"
import Avatar2 from "@/app/components/Avatar2"
import { MdOutlineKeyboardBackspace, MdOutlineVerified } from "react-icons/md"
import { BsCalendar3, BsPhone } from "react-icons/bs"
import { BiPhoneCall } from "react-icons/bi"
import { HiOutlineMail } from 'react-icons/hi'
import { useRouter } from "next/navigation"
import { AiOutlineMessage } from "react-icons/ai"

interface ContactLandlordProps {
    landlord: ContactUser | null
}

const Heading = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '400'
})

const Paragraph = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
})

const ContactLandlord: FC<ContactLandlordProps> = ({ landlord }) => {

    const router = useRouter()
  return (
    <div className='md:max-w-[748px] lg:max-w-screen-lg md:mx-auto mx-5 md:pt-[130px] pt-[100px] flex flex-col md:gap-[75px] gap-10'>
        <div className='flex flex-row gap-5 items-center'>
            <MdOutlineKeyboardBackspace onClick={() => router.back()} className="text-2xl text-[#202020] cursor-pointer" />
            <h1 className={`md:text-3xl text-2xl text-[#202020] tracking-wide ${Heading.className}`}>
                Reserve 
            </h1>
        </div>
        <div className='grid md:grid-cols-2 md:gap-20 gap-5 mb-2'>
            <div className='col-span-1 w-full flex flex-col gap-2'>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                        <Avatar2 src={landlord?.image} />
                        <p className={`text-xl tracking-wide text-[#202020] ${Heading.className}`}>
                            {landlord?.firstName} {landlord?.lastName}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2 items-center">
                            <BsPhone className="text-md text-[#202020]" />
                            <p className="text-md tracking-wider text-[#202020]">
                                (+237){landlord?.phoneNumber}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-row gap-1 items-center">
                            <MdOutlineVerified className="text-[#747171] text-sm" />
                            <p className={`text-sm tracking-wide text-[#747171] ${Paragraph.className}`}>
                                Verified 
                            </p>
                        </div>
                        <div className="flex flex-row gap-1 items-center">
                            <BsCalendar3 className="text-[#747171] text-sm" />
                            <p className={`text-sm tracking-wide text-[#747171] ${Paragraph.className}`}>
                                Joined {formatTimeToNow(landlord?.createdAt)} 
                            </p>
                        </div>
                    </div>
                    <div className="flex md:flex-row flex-col gap-2 w-full">
                        <button className={`text-[#202020] bg-[#f1f1f1] hover:text-white hover:bg-gradient-to-r from-[#16364a] to-[#061315] p-3 w-full flex flex-row gap-2 justify-center rounded-md items-center ${Heading.className}`}>
                            <AiOutlineMessage className="text-xl" />
                            Message {landlord?.firstName}
                        </button>
                        <button className={`text-[#ffff] bg-[#3AB0FF] hover:bg-gradient-to-r from-[#16364a] to-[#061315] p-3 w-full flex flex-row gap-2 justify-center rounded-md items-center ${Heading.className}`}>
                            <BiPhoneCall className="text-xl" />
                            Call {landlord?.firstName}
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-span-1 overflow-y-auto md:max-h-[500px] border-[1px] max-h-[430px] bg-white shadow-md w-full flex flex-col rounded-lg p-5 gap-5">
                {landlord?.properties.map((property) => (
                    <div key={property.id} className="flex flex-row gap-2 w-full">
                        <Image src={property.coverPhoto} className="rounded-md" style={{objectFit: 'contain'}} width={100} height={100} alt="property-for-rent" />
                        <div className="flex flex-col justify-between">
                            <p className={`text-sm tracking-wider text-[#202020] ${Heading.className}`}>
                                {property.title}
                            </p>
                            <p className={`text-sm tracking-wider text-[#747171] ${Paragraph.className}`}>
                                {property.address}, {property.city}
                            </p>
                        </div>
                    </div>                       
                ))}
                <hr className="mt-2"/>
                <div className="flex flex-col gap-5">
                    <h1 className="text-[#202020] text-lg tracking-wider">
                        Rent Details
                    </h1>
                    {landlord?.properties.map((property) => (
                        <div key={property.id} className="flex flex-col gap-2">
                            {property.pricing.map((price) => (
                                <div key={price.id} className="flex flex-row justify-between">
                                    <p className={`text-md text-neutral-500 ${Paragraph.className}`}>
                                        {price.unitType}
                                    </p>
                                    <p className={`text-md text-[#202020] ${Heading.className}`}>
                                        XAF {price.price} {price.rentalPeriod}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <hr />
                <div className="flex flex-col gap-5">
                    <h1 className="text-[#202020] text-lg tracking-wider">
                        Extra Fees
                    </h1>
                    {landlord?.properties.map((property) => (
                        <div key={property.id} className="flex flex-col gap-2">
                            {property.extraFees.map((fee) => (
                                <div key={fee.id} className="flex flex-row justify-between">
                                    <p className={`text-md text-neutral-500 ${Paragraph.className}`}>
                                        {fee.feeName}
                                    </p>
                                    <p className={`text-md text-[#202020] ${Heading.className}`}>
                                        XAF {fee.amount}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ContactLandlord