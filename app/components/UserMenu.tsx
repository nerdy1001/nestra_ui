'use client'

import React, { useCallback, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'
import { signOut } from "next-auth/react";
import { useRouter } from 'next/navigation'

import { SafeUser } from '../types'
import Avatar from './Avatar'
import MenuItems from './MenuItems'
import useRegisterModal from '../hooks/useRegisterModal'
import useLoginModal from '../hooks/useLoginModal'
import useListingModal from '../hooks/useListingModal'


interface UserMenuProps {
    currentUser?: SafeUser | null
    isChatPage?: boolean
  }

const UserMenu: React.FC<UserMenuProps> = ({ currentUser, isChatPage }) => {


    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const listingModal = useListingModal()

    const router = useRouter()

    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value)
    }, [])

    const onList = useCallback(() => {
        if(!currentUser) {
          return  loginModal.onOpen()
        }
        listingModal.onOpen()
        setIsOpen(false)
    }, [currentUser, loginModal, listingModal])
    
    const onLogin = useCallback(() => {
        loginModal.onOpen()
        setIsOpen(false)
    }, [loginModal])

    const onRegister = useCallback(() => {
        registerModal.onOpen()
        setIsOpen(false)
    }, [loginModal])

    const onLogout = () => {
        signOut()
        setIsOpen(false)
    }


  return (
    <div className='relative z-50'>
        <div className='flex flex-row items-center gap-3'>
            {!isChatPage ? (
                <div className='hidden lg:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'>
                    {currentUser?.isHost ? (
                        <p className='cursor-pointer' onClick={() => router.push(`/landlord/${currentUser?.id}`)}>
                            Switch to landlord
                        </p>
                    ) : (
                        <p className='cursor-pointer' onClick={() => {
                            currentUser 
                            ?
                            router.push(`/rent-property/${currentUser?.id}`)
                            : 
                            onLogin()
                        }}>
                            Rent out property
                        </p>
                    )}
                </div>
            ) : (
                null
            )}
            <div onClick={toggleOpen} className='p-2 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-1 rounded-full cursor-pointer md:shadow-none hover:shadow-lg shadow-lg transition'>
                <div className='hidden md:block'>
                    <Avatar src={currentUser?.image} />
                </div>
                <MdArrowDropDown className='text-[#202020] text-[25px]' />
            </div>
        </div>
        { isOpen && (
            <div className='absolute rounded-xl shadow-lg w-[60vw] md:w-[30vw] lg:w-[20vw] xl:w-[15vw] bg-white overflow-hidden right-0 top-15 text-sm'>
                <div className='flex flex-col cursor-pointer m-auto'>
                    {currentUser ? (
                        <div className='py-1'>
                            <MenuItems onClick={() => router.push('/')} label='nestra' isTitle />
                            <hr className='my-3 md:hidden block' />
                            <MenuItems onClick={() => router.push('/wishlist')} label='Wishlist' />
                            <MenuItems onClick={() => router.push(`/user_profile/${currentUser.id}`)} label='Account' />
                            { currentUser?.isHost ? (
                                <>
                                    <hr className='my-3' />
                                    <MenuItems onClick={() => router.push(`/landlord/${currentUser.id}`)} label='Manage properties' />
                                </>
                            ) : (
                                <>
                                    <hr className='my-3' />
                                    <MenuItems onClick={() => router.push(`/rent-property/${currentUser.id}`)} label='Rent out property' />
                                </>
                            )}
                            <hr className='my-3' />
                            <MenuItems onClick={onLogout} label='Log out' />
                        </div>
                    ) : (
                        <>
                            <MenuItems onClick={() => router.push('/')} label='nestra' isTitle={true} />
                            <hr className='my-3 md:hidden block' />
                            <MenuItems onClick={onLogin} label='Log in' />
                            <MenuItems onClick={onRegister} label='Join Nestra' />
                        </>
                    )}
                </div>
            </div>
        )}    
    </div>
  )
}

export default UserMenu