'use client'

import Avatar2 from '@/app/components/Avatar2'
import { ContactUser } from '@/app/types'
import { FC } from 'react'
import { Be_Vietnam_Pro } from "next/font/google"
import { formatTimeToNow } from "@/app/libs/utils"
import { Comment } from '@prisma/client'
import { GrLanguage, GrLocation } from 'react-icons/gr'
import { BsBalloon, BsChatDots, BsCheck2 } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { useRouter } from 'next/navigation'
import Avatar3 from '@/app/components/Avatar3'

interface UserAccountProps {
  user: ContactUser | null
  comments?: Comment[]
}

const Bold = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '700'
})

const medium = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '500'
})

const Regular = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '300'
})

const UserAccount: FC<UserAccountProps> = ({ user, comments }) => {

  const router = useRouter()

  return (
    <div className='md:max-w-screen-md lg:max-w-4xl md:bg-white md:p-20 max-w-screen-sm md:mx-auto mx-5 md:pt-[120px] pt-[120px] flex flex-col gap-10'>
      <div className='bg-white flex flex-col gap-2 w-full items-center rounded-xl'>
        <Avatar3 src={user?.image} />
        {user?.isHost ? (
          <div className='flex flex-col gap-2 items-center justify-between'>
            <div className='flex flex-row gap-2 items-center'>
              <p className={`text-2xl text-black ${Bold.className}`}>
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div className='flex flex-row gap-5'>
              <p className={`text-md text-[#202020] ${Regular.className}`}>
                {comments?.length} comments
              </p>
              <p className={`text-md text-[#202020] ${Regular.className}`}>
                {user.properties.length} listings
              </p>
              <p className={`text-md text-[#202020] ${Regular.className}`}>
                Joined {formatTimeToNow(user.createdAt)}
              </p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-between'>
            <p className={`text-xl text-[#202020] ${Bold.className}`}>
              {user?.firstName} {user?.lastName}
            </p>
            <p className={`text-sm text-[#202020] ${Regular.className}`}>
              tenant
            </p>
          </div>
        )}

      </div>
      <hr />
      <div className='flex flex-col gap-10'>
        <div className='flex-row gap-5 items-center hidden'>
          <h1 className={`text-xl text-[#202020] ${medium.className}`}>
            About {user?.firstName}
          </h1>
          <button className='border-black border-[1px] hover:bg-[#f2f2f2] rounded-md px-[8px] py-[4px] text-black text-sm'>
            Edit profile
          </button>
        </div>
        <div className='grid md:grid-cols-3 grid-cols-1 gap-5'>
          <div className='flex flex-row gap-2 items-center'>
            <GrLanguage className='text-xl text-[#202020]'/>
            <p className={`text-md text-[#202020] ${Regular.className}`}>
              Speaks english, french
            </p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <GrLocation className='text-xl text-[#202020]'/>
            <p className={`text-md text-[#202020] ${Regular.className}`}>
              Lives in Yaoundé
            </p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <BsBalloon className='text-xl text-[#202020]'/>
            <p className={`text-md text-[#202020] ${Regular.className}`}>
              Born in the 80s
            </p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <BsCheck2 className='text-xl text-[#202020]'/>
            <p className={`text-md text-[#202020] ${Regular.className}`}>
              Credentials verified
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-5 w-full'>
        <p className={`text-md text-[#202020] tracking-wide ${Regular.className}`}>
          I am a software engineer with over half a decade of experience working with languages such as Java, Dart, C++, Python, JavaScript and database technologies
          such as MongoDB, SQL, PostGreSQL and Cassandra. I am the classic nerd as I spend most of my free time gaming but I also play basketball when I decide to 
          get out of my shell and socialize. I have a competitive instinct and a hunger to win and I try to bring that attitude in all the things I do.
        </p>
      </div>
      <hr />
      <div className='flex flex-col gap-5'>
        <h1 className={`text-xl text-[#202020] ${medium.className}`}>
          {user?.firstName}&apos;s listings
        </h1>
        <div className='flex overflow-x-scroll pb-10'>
          <div className='flex flex-nowrap' onClick={() => {}}>
            {user?.properties.map((property) => (
              <div key={user.id} className='inline-block pr-5'>
                <div className='w-64 h-64 max-w-xs overflow-hidden flex flex-col gap-2'>
                  <div>
                    <img src={property.coverPhoto} alt="listing" className='object-cover cursor-pointer rounded-md h-full w-full' />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='flex flex-row justify-between'>
                      <p className={`text-md text-[#202020] ${medium.className}`}>
                        {property.category}
                      </p>
                      <div className='flex flex-row gap-2 items-center'>
                        <BsChatDots className='text-md text-[#202020]' />
                        <p className={`text-md text-[#202020] ${Regular.className}`}>
                          {comments?.length}
                        </p>
                      </div>
                    </div>
                    <p className={`text-md text-neutral-500 ${Regular.className}`}>
                      {property.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {user?.properties.map((property) => (
              <div key={user.id} className='inline-block pr-5'>
                <div className='w-64 h-64 max-w-xs overflow-hidden flex flex-col gap-2'>
                  <div>
                    <img src={property.coverPhoto} alt="listing" className='object-cover cursor-pointer rounded-md h-full w-full' />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='flex flex-row justify-between'>
                      <p className={`text-md text-[#202020] ${medium.className}`}>
                        {property.category}
                      </p>
                      <div className='flex flex-row gap-2 items-center'>
                        <BsChatDots className='text-md text-[#202020]' />
                        <p className={`text-md text-[#202020] ${Regular.className}`}>
                          {comments?.length}
                        </p>
                      </div>
                    </div>
                    <p className={`text-md text-neutral-500 ${Regular.className}`}>
                      {property.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {user?.properties.map((property) => (
              <div key={user.id} className='inline-block pr-5'>
                <div className='w-64 h-64 max-w-xs overflow-hidden flex flex-col gap-2'>
                  <div>
                    <img src={property.coverPhoto} alt="listing" className='object-cover cursor-pointer rounded-md h-full w-full' />
                  </div>
                  <div className='flex flex-col gap-1'>
                    <div className='flex flex-row justify-between'>
                      <p className={`text-md text-[#202020] ${medium.className}`}>
                        {property.category}
                      </p>
                      <div className='flex flex-row gap-2 items-center'>
                        <BsChatDots className='text-md text-[#202020]' />
                        <p className={`text-md text-[#202020] ${Regular.className}`}>
                          {comments?.length}
                        </p>
                      </div>
                    </div>
                    <p className={`text-md text-neutral-500 ${Regular.className}`}>
                      {property.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAccount