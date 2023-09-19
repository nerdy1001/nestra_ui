'use client'

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import qs from "query-string";
import { Be_Vietnam_Pro } from "next/font/google";

const beVietnamPro500 = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '500'
})

const SearchModal = () => {

    const router = useRouter()
    const params = useSearchParams()
    const searchModal = useSearchModal()

    const [city, setCity] = useState('')
    const [category, setCategory] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')

    const onSubmit = useCallback(async() => {

        let currentQuery = {}

        if (params) {
            currentQuery = qs.parse(params.toString())
        }

        const updatedQuery: any = {
            ...currentQuery,
            address,
            category,
            city, 
            price
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true })

        router.push(url)

        searchModal.onClose()

        setAddress('')
        setCategory('')
        setCity('')
        setPrice('')

    }, [
        address,
        category,
        city,
        price
    ])

    let bodyContent = (
        <div className="flex flex-col gap-5 md:p-10">
            <div className='w-full flex flex-col gap-2'>
                <p className={`text-[18px] text-[#202020] truncate`}>
                    House type
                </p>
                <select onChange={(e: any) => setCategory(e.target.value)} placeholder="What kind of house ?" className='peer w-full p-4 text-[#202020] bg-[#2020200f] font-light rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black'>
                    <option value=''></option>
                    <option value="Student">Student</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Beach">Beach</option>
                    <option value="Family">Family</option>
                    <option value="Holiday">Holiday</option>
                    <option value="Guest">Guest</option>
                </select>
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label className="text-[18px] text-[#202020]">
                    City
                </label>
                <input onChange={(e: any) => setCity(e.target.value)} type="text" placeholder="Which city is it located ?" className='peer p-4 bg-[#2020200f] w-full font-light rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label className="text-[18px] text-[#202020]">
                    Neighborhood 
                </label>
                <input onChange={(e: any) => setAddress(e.target.value)} type="text" placeholder="In which neighborhood ?" className='peer p-4 bg-[#2020200f] w-full font-light rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black' />
            </div>
            <div className='w-full flex flex-col gap-2'>
                <label className="text-[18px] text-[#202020]">
                    Budget 
                </label>
                <input onChange={(e: any) => setPrice(e.target.value)} type="number" placeholder="What is your budget ?" className='peer p-4 bg-[#2020200f] w-full font-light rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black' />
            </div>
        </div>
    )

   return (
        <Modal body={bodyContent} isOpen={searchModal.isOpen} onClose={searchModal.onClose} onSubmit={onSubmit} title="Search Form" actionLabel="Search"  />
    )
}

export default SearchModal