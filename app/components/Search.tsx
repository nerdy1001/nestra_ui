'use client'

import React from 'react'
import { IoSearch } from 'react-icons/io5'
import useSearchModal from '../hooks/useSearchModal'

const Search = () => {

  const searchModal = useSearchModal()

  return (
    <div onClick={searchModal.onOpen} className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-lg transition cursor-pointer'>
        <div className='flex flex-row items-center justify-between'>
            <div className='text-[13px] font-semibold px-6 text-[#202020]'>
                What are you looking for ?
            </div>
            <div className='hidden 
              sm:block 
              text-sm 
              font-semibold 
              px-6 
              border-l-[1px] 
              flex-1 
              text-center'
            >
              In which city ?
            </div>
            <div className='p-2 bg-[#3AB0FF] rounded-full text-white mx-3'>
              <IoSearch size={18} />
            </div>
        </div>
    </div>
  )
}

export default Search