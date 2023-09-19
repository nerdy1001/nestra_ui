'use client'

import Input from '@/app/components/inputs/Input'
import { setTitleAndDescription } from '@/app/reducers/property/propertySlice'
import { SafeUser } from '@/app/types'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

interface TitleAndDescriptionProps {
  currentUser: SafeUser | null
}

const TitleAndDescription: FC<TitleAndDescriptionProps> = ({ currentUser }) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const initialState = {
        title: '',
        description: ''
    } 

    const [titleAndDesc, setTitleAndDesc] = useState(initialState)

    const onNext = () => {
        dispatch(setTitleAndDescription(titleAndDesc))
        router.push(`/rent-property/${currentUser?.id}/verify-identity`)
    }

    console.log(titleAndDesc)

  return (
    <div className='max-w-screen-xl mx-auto py-[110px] md:pt-[110px] flex flex-col justify-center items-center'>
        <h1 className=' text-body md:text-[30px] text-[28px] text-center'>
            Give your property a title and description
        </h1>
        <div className='flex flex-col gap-3 md:w-[70%] w-full mt-5'>
            <div className='w-full flex flex-col gap-2'>
                <label>
                    Title
                </label>
                <input placeholder='Give it a catchy title' onChange={(e: any) => setTitleAndDesc({ ...titleAndDesc, title: e.target.value })} type="text" className='peer w-full p-3 font-light border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black bg-white border-neutral-300 pl-4' />
            </div>
            <div className='flex flex-col gap-2 mt-2'>
                <label>
                    Description
                </label>
                <textarea placeholder='What sets your place from the rest ?' onChange={(e: any) => setTitleAndDesc({ ...titleAndDesc, description: e.target.value })} cols={10} rows={10} className='peer w-full p-4 pt-4 md:pt-4 font-light bg-white border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4 focus:border-black border-neutral-300'></textarea>
            </div>
        </div>
        <div className='flex justify-between items-center w-full py-5 md:px-[100px] px-5 fixed bottom-0 z-10 bg-[#f5f5f5]'>
            <button onClick={() => router.push(`/rent-property/${currentUser?.id}/photos`)} className={`rounded-lg border-[1.5px] border-[#202020] text-md bg-[#f5f5f5] transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-slate-900 to-gray-700 hover:text-white text-body px-6 py-3`}>
                Back
            </button>
            <button onClick={onNext} className={`rounded-lg text-md transition duration-500 ease-in-out bg-[#3AB0FF] hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-[#3AB0FF] to-blue-500 text-white px-6 py-3`}>
                Next
            </button>
        </div>
    </div>
  )
}

export default TitleAndDescription