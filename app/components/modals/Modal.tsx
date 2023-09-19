'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'

import Button from '../Button';
import Navbar from '../Navbar';

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    viewDescription?: boolean;
    title?: string;
    subtitle?: string;
    isListing?: boolean;
    isWishList?: boolean;
    isAuthenticating?: boolean
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: string;
    disabled?: boolean;
    rentModal?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, isWishList, viewDescription, isAuthenticating, onClose, isListing, onSubmit, title, subtitle, body, footer, actionLabel, disabled, secondaryAction, secondaryActionLabel }) => {

    const [showModal, setShowModal] = useState(isOpen)

    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])

    const handleClose = useCallback(() => {
        if(disabled) {
            return
        }

        setShowModal(false)
        setTimeout(() => {
            onClose()
        }, 300)

        localStorage.setItem('resetModal', `${true}`)

    }, [disabled, onClose])

    const handleSubmit = useCallback(() => {
        if(disabled) {
            return
        }
        onSubmit()
    }, [disabled, onSubmit])

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return
        }

        secondaryAction()
    }, [disabled, secondaryAction])

    if(!isOpen) {
        return null
    }

  return (
    <div className={`justify-center overflow-x-hidden overflow-y-auto items-center flex fixed inset-0 z-50 outline-none focus:outline-none bg-cover bg-[#000000b1] ${viewDescription && 'bg-[#000000b1]'} ${isWishList && 'bg-[#000000b1]'}`}>
            <div className={`relative w-full md:w-4/6 lg:w-3/6 ${viewDescription || isListing ? 'xl:w-3/5' : 'xl:w-2/5'} my-6 mx-auto h-100vh lg:h-auto md:h-auto`}>
                <div className={`translate duration-300 h-full ${showModal ? 'translate-y-0' : 'translate-y-full'} ${showModal ? 'opacity-100' : 'opacity-0'}`}>
                    <div className='translate py-5 md:pt-0 h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex justify-center flex-col w-full bg-white outline-none focus:outline-none'>
                        <div className={`flex items-center p-4 rounded-t justify-center relative md:mt-0  ${isListing && 'border-b-[1px]'} ${isAuthenticating && 'border-b-[1px]'}`}>
                            <button onClick={handleClose} className='p-1 md:mt-1  border-0 hover:opacity-70 transition absolute left-9'>
                                <IoMdClose />
                            </button>
                            <div className={`${isListing ? 'text-sm font-semibold' : 'text-sm h-[20px] font-semibold'}`}>
                                {title}
                            </div>
                        </div>
                        <div className={`relative ${viewDescription ? 'p-8' : 'p-6'} ${isListing ? 'mt-1' : 'mt-1'}`}>
                            {body}
                        </div>
                        <div className='flex flex-col gap-2 p-6'>
                            <div className='flex flex-row items-center gap-4 md:h-[40px] h-[10px]'>
                                {secondaryAction && secondaryActionLabel && (
                                    <Button outline disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction} />
                                )}
                                {!viewDescription && (
                                    <Button rentModal={true} outline={false} disabled={disabled} label={actionLabel} onClick={handleSubmit} />              
                                )}
                            </div>
                        </div>
                        {footer}
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Modal