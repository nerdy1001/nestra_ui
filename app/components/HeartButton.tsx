'use client'

import React, { useState } from 'react'
import { SafeUser } from '../types';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useLoginModal from '../hooks/useLoginModal';
import useFavorite from "@/app/hooks/useFavorite";

interface HeartButtonProps {
    propertyId: string;
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
    propertyId,
    currentUser
}) => {
  const { isFavorite, toggleFavorite } = useFavorite({
    propertyId,
    currentUser
  });
  const loginModal = useLoginModal() 

  const addToFavorites = (e: any) => {
    if(currentUser) {
      toggleFavorite(e)
    } else {
      loginModal.onOpen()
    }
  }

  return (
    <div onClick={addToFavorites} className='relative hover:opacity-80 transition cursor-pointer'>
      {isFavorite ? (
        <AiFillHeart size={28} className={`fill-[#46bccc] absolulte -top-[2px] -right-[2px]`} />
      ) : (
        <AiOutlineHeart size={26} className={`fill-white absolulte -top-[2px] -right-[2px]`} />
      )}
    </div>
  )
}

export default HeartButton