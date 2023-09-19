'use client'

import { Be_Vietnam_Pro } from "next/font/google"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'
import qs from 'query-string'


interface CategoryBoxProps {
    label: string
    icon: IconType
    selected?: boolean
}

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
})

const CategoryBox: React.FC<CategoryBoxProps> = ({ icon: Icon, label, selected }) => {

    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery, category: label
        }

        if (params?.get('category') === label) {
            delete updatedQuery.category
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        router.push(url)

    }, [label, params, router])

  return (
    <div onClick={handleClick} className={`flex flex-row items-center justify-center gap-2 pb-5 transition cursor-pointer`}>
       <div className={`p-[10px] md:p-[10px] flex flex-row items-center border-[1.5px] justify-center gap-2 rounded-full cursor-pointer hover:shadow-md transition ${selected ? 'text-white' : 'text-[#202020]'} ${selected ? 'bg-[#202020]' : 'bg-white'} ${selected ? 'hover:text-white' : 'hover:text-[#202020]'}`}>
            <Icon size={20} />
            <p className={`font-medium text-xs`}>{label}</p>
       </div>
    </div>
  )
}

export default CategoryBox