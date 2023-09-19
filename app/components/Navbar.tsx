'use client'


import { Fredoka } from "next/font/google"
import React from 'react'

import { SafeUser } from '../types'
import Container from './Container'
import Search from './Search'
import UserMenu from './UserMenu'
import Categories from './Categories'
import Link from "next/link"

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: '600'
})

interface NavbarProps {
  currentUser?: SafeUser | null;
  isWishListPage? : boolean
  isHostingPage? : boolean
  isPropertyDetailsPage?: boolean
  isHomePage?: boolean
  isContactPage?: boolean
  isUserAccountPage?: boolean
}

const Navbar: React.FC<NavbarProps> = ({ currentUser, isWishListPage, isHostingPage, isContactPage, isUserAccountPage }) => {


  return (
    <div className={`fixed  w-full bg-white z-10 shadow-sm`}>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3'>
            <Link href='/' className={`${isWishListPage || isHostingPage || isContactPage || isUserAccountPage ? 'block' : 'hidden'} md:block font-bold text-[#3AB0FF] font-fredoka cursor-pointer text-[26px] ${fredoka.className}`}>
              nestra
            </Link>
            { isWishListPage || isHostingPage || isContactPage || isUserAccountPage ? (
              null
            ) : (
              <Search />
            )}
            { isHostingPage || isContactPage ? (
              <div className={`block ${isContactPage ? '' : 'border-[1px]'} hover:border-[#202020] text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer`}>
                { isContactPage ? '' : 'Save & exit'}
              </div>
            ) : (
              <UserMenu currentUser={currentUser} />
            )}
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar