'use client'

import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Be_Vietnam_Pro } from "next/font/google"

interface CounterProps {
    title: string;
    subtitle: string;
    value: number;
    onChange: (value: number) => void
}

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
  })

const Counter: React.FC<CounterProps> = ({ title, subtitle, value, onChange }) => {

    const onAdd = useCallback(() => {
        onChange(value + 1)
    }, [onChange, value])

    const onReduce = useCallback(() => {
        if(value === 0) {
            return
        }

        onChange(value - 1) 
    }, [value, onChange])

  return (
    <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-col'>
            <div className='font-medium text-md'>
                {title}
            </div>
            <div className={`font-light mt-1 text-neutral-500 ${beVietnamPro.className}`}>
                {subtitle}
            </div>
        </div>
        <div className='flex flex-row items-center gap-4'>
            <div onClick={onReduce} className='w-8 h-8 rounded-full border-[1px] border-neutral-600 flex items-center justify-center cursor-pointer text-neutral-600 hover:opacity-80 transition'>
                <AiOutlineMinus />
            </div>
            <div className='font-light text-lg text-neutral-600'>
                {value}
            </div>
            <div onClick={onAdd} className='w-8 h-8 rounded-full border-[1px] border-neutral-600 flex items-center justify-center cursor-pointer text-neutral-600 hover:opacity-80 transition'>
                <AiOutlinePlus />
            </div>
        </div>
    </div>
  )
}

export default Counter