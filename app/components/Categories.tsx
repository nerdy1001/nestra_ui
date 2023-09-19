'use client'

import React from 'react'

import { BiBuildingHouse } from 'react-icons/bi'
import { RiHotelBedLine } from 'react-icons/ri'
import { TbBeach } from 'react-icons/tb'
import { AiOutlineHome } from 'react-icons/ai'
import { HiOutlineHomeModern } from 'react-icons/hi2'

import Container from './Container'
import CategoryBox from './CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'


export const categories = [
    {
        label: 'Room',
        icon: RiHotelBedLine
    },
    {
        label: 'Apartment',
        icon: BiBuildingHouse
    },
    {
        label: 'Guest',
        icon: HiOutlineHomeModern
    },
    {
        label: 'Holiday',
        icon: TbBeach
    },
    {
        label: 'Family',
        icon: AiOutlineHome
    },
]

const Categories = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathName = usePathname()

    const isMainPage = pathName === '/'

    if(!isMainPage) {
        return null
    }

  return (
    <Container>
        <div className='pt-5 flex flex-row gap-5 items-center sm:justify-between lg:justify-center md:justify-center overflow-x-auto'>
            {categories.map((item) => (
                <CategoryBox key={item.label} selected={category === item.label} label={item.label} icon={item.icon} />
            ))}           
        </div>
    </Container>
  )
}

export default Categories