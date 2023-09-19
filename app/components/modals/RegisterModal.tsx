'use client'

import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'


import useRegisterModal from '../../hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import Button from '../Button'
import useLoginModal from '@/app/hooks/useLoginModal'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const RegisterModal = () => {

    const router = useRouter()

    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, reset, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            password: '',          
        }
    })


    const toggle = useCallback(() => {
        registerModal.onClose()
        loginModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <>
            <div className='flex flex-col gap-4'>
                <Heading center title="Welcome to nestra" subtitle="Join us and find your dream home" />
                <div className='flex flex-row gap-2'>
                    <Input id='firstName' label='First name' type='text' disabled={isLoading} register={register} errors={errors} required />
                    <Input id='lastName' label='Last name' type='text' disabled={isLoading} register={register} errors={errors} required />
                </div>
                <Input id='email' label='Email' type='email' disabled={isLoading} register={register} errors={errors} required />
                <Input id='phoneNumber' label='Phone number' type='number' disabled={isLoading} register={register} errors={errors} required />
                <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required />
            </div>
        </>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 p-6'>
            <hr />
            <Button outline label='Join with Google' icon={FcGoogle} onClick={() => signIn('google')} />

            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div>
                        Joined us already ?
                    </div>
                    <div onClick={toggle} className='text-neutral-800 cursor-pointer underline'>
                        Continue
                    </div>
                </div>
            </div>
        </div>
    )

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        setIsLoading(true)

        axios.post('/api/register', {...data})
        .then(() => {
            toast.success(`Welcome to Nestra, ${data.firstName}`);
            registerModal.onClose();
            reset()
        })
        .catch((error: any) => {
            toast.error('We ran into a problem. Check your credentials and try again.');
        })
        .finally(() => {
            signIn('credentials', { 
            ...data, 
            redirect: false,
            })
            .then((callback) => {
                setIsLoading(false);
        
                if (callback?.ok) {
                    toast.success('Logged in');
                    router.refresh();
                    loginModal.onClose();
                }
              
                if (callback?.error) {
                    toast.error(callback.error);
                }
            });
            setIsLoading(false);
        })
        
    }

  return (
    <Modal disabled={isLoading} isAuthenticating isOpen={registerModal.isOpen} title='Join Nestra' actionLabel='Agree and join' onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
  )
}

export default RegisterModal