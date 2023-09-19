'use client'

import React, { useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import useRegisterModal from '../../hooks/useRegisterModal'
import Modal from './Modal'
import Heading from '../Heading'
import Input from '../inputs/Input'
import { toast } from 'react-hot-toast'
import Button from '../Button'
import useLoginModal from '@/app/hooks/useLoginModal'

const LoginModal = () => {

    const router = useRouter()
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()

    const [isLoading, setIsLoading] = useState(false)

    const { register, handleSubmit, reset, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const toggle = useCallback(() => {
        loginModal.onClose()
        registerModal.onOpen()
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading center title="Hey, you're back" subtitle="Continue your home search." />
            <Input id='email' label='Email' type='email' disabled={isLoading} register={register} errors={errors} required />
            <Input id='password' label='Password' type='password' disabled={isLoading} register={register} errors={errors} required />
            <p className='text-sm underline cursor-pointer mt-1' onClick={() => {}}>
                Forgot password ?
            </p>
        </div>
    )

    const footerContent = (
        <div className='flex flex-col gap-4 p-6'>
            <hr />
            <Button outline label='Continue with Google' icon={FcGoogle} onClick={() => signIn('google')} />
            <div className='text-neutral-500 text-center mt-4 font-light'>
                <div className='flex flex-row justify-center items-center gap-2'>
                    <div className='md:block '>
                        First time here ?
                    </div>
                    <div onClick={toggle} className='text-neutral-800 cursor-pointer underline'>
                        Join us now
                    </div>
                </div>
            </div>
        </div>
    )

    const onSubmit: SubmitHandler<FieldValues> = (data, e: any) => {
        
        setIsLoading(true)

        signIn('credentials', { 
        ...data, 
        redirect: false,
        })
        .then((callback) => {
            setIsLoading(false);

            if (callback?.ok) {
                toast.success('Welcome back');
                router.refresh();
                reset()
                loginModal.onClose();
            }
      
            if (callback?.error) {
                reset()
                toast.error(callback.error);
            }
        });
    }

  return (
    <Modal disabled={isLoading} isAuthenticating isOpen={loginModal.isOpen} title='login' actionLabel='Continue' onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent} />
  )
}

export default LoginModal