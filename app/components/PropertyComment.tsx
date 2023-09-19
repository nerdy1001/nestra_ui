'use client'

import { FC } from 'react'
import { Be_Vietnam_Pro } from "next/font/google"
import Avatar4 from './Avatar4'
import { formatTimeToNow } from '../libs/utils'

interface PropertyComment {
  comment: string
  author: string | null
  date: Date
  profile: string | null | undefined
}

const beVietnamProName = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '400'
})

const beVietnamProDate = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '300'
})

const PropertyComment: FC<PropertyComment> = ({ comment, author, date, profile }) => {
  return (
    <div className='flex flex-col gap-3 w-full'>
      <div className='flex flex-row gap-2'>
        <Avatar4 src={profile} />
        <div className='flex flex-col gap-[2px]'>
          <h1 className={`text-black text-[16px] ${beVietnamProName}`}>
            {author} 
          </h1>
          <p className={`text-[12px] text-neutral-500 ${beVietnamProDate}`}>
            {formatTimeToNow(new Date(date))}
          </p>
        </div>
      </div>
      <p className={`text-[15px] text-[#202020] ${beVietnamProDate}`}>
        {comment}
      </p>
    </div>
  )
}

export default PropertyComment