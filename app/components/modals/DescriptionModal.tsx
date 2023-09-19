'use client'
import React from 'react'
import { Be_Vietnam_Pro } from "next/font/google"

import useDescriptionModal from '@/app/hooks/useDescriptionModal';
import { SafeListings } from '@/app/types';
import Modal from './Modal';
import Heading from '../Heading';

interface DescriptionModalProps {
    property?: SafeListings;
}

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
})

const DescriptionModal: React.FC<DescriptionModalProps> = ({ property }) => {

    const descriptionModal = useDescriptionModal()
    const description = localStorage.getItem('description')

    const bodyContent = (
        <div className={`flex flex-col gap-3 leading-8`}>
            <Heading title='About this place' />
            <div className={`${beVietnamPro.className} max-h-[55vh] text-neutral-500 overflow-y-auto`}>
                {description}
            </div>
        </div>
    )
  return (
    <Modal viewDescription onSubmit={() => {}} isOpen={descriptionModal.isOpen} body={bodyContent} isListing={false} onClose={descriptionModal.onClose} />
  )
}

export default DescriptionModal