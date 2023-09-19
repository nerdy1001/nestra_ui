'use client'

import Heading from '@/app/components/Heading'
import Input from '@/app/components/inputs/Input'
import { SafeUser } from '@/app/types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { AiOutlineCloseCircle, AiOutlineIdcard } from 'react-icons/ai'
import { BsCreditCard2Front } from 'react-icons/bs'
import { storage } from '@/app/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useDispatch } from 'react-redux'
import { setIdPhoto, setIdentity } from '@/app/reducers/property/propertySlice'

interface VerifyIdProps {
  currentUser: SafeUser | null
}

const VerifyId: FC<VerifyIdProps> = ({ currentUser }) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [idImage, setIdImage] = useState<any>([])
    const [idImageUrl, setIdImageUrl] = useState([''])
    const [Id, setId] = useState('')
    const [progress, setProgress] = useState(Number)


    const onUploadID = (e: any) => {
        for ( let i = 0; i < e.target.files.length; i++) {
          const image = e.target.files[i]
          setIdImage((prevState: any[]) => [...prevState, image])
        }
      }
  
    const onRemoveIdImage = (image: any) => {
      setIdImage(idImage.filter((e: any) => e !== image))
    }

    const onNext = () => {

      const promises = []

      idImage.map((image: any) => {
        const storageRef = ref(storage, `idPhotos/${image.name}`)
        const uploadTask = uploadBytesResumable(storageRef, image)
        promises.push(uploadTask)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setProgress(progress)
          },
          (error) => {
            console.log(error)
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downLoadUrl) => {
              dispatch(setIdPhoto(downLoadUrl))
            })
          }
        )
        dispatch(setIdentity(Id))
        console.log(Id)
        router.push(`/rent-property/${currentUser?.id}/finish-listing`)
      })
    }
  return (
    <div className='max-w-screen-xl mx-auto py-[110px] md:pt-[110px] flex flex-col justify-center items-center'>
        <Heading center title='We want to be sure it is actually you' subtitle='Upload the front and back pictures of your National Id and type your Id number.'/>
        <div className='md:w-[70%] w-full flex flex-col gap-2 mt-5'>
            <label>
                National Id Number
            </label>
            <input onChange={(e: any) => setId(e.target.value)} type="number" className='peer w-full p-3 font-light border-[1px] rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed focus:border-black bg-white border-neutral-300 pl-4' />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 md:w-[70%] w-full'>
            <div className='relative rounded-xl border-dashed border-[0.1px] w-full h-[250px] p-4 flex flex-col items-center justify-center gap-3 border-[#202020]'>
              <AiOutlineIdcard size={40} />
              <label className={`font-medium text-lg`}>
                Upload front picture
                <input className='hidden cursor-pointer' type='file' name='property-images' onChange={onUploadID} accept='image/png, image/jpeg, image/jpg, image/webp' />
              </label>
              { idImage[0] && (
                <div className="absolute inset-0 w-full h-full">
                  <Image className='rounded-lg' fill style={{ objectFit: 'cover' }} src={`${URL.createObjectURL(idImage[0])}`} alt="Id-front" />
                  <div className='absolute top-3 right-3'>
                    <AiOutlineCloseCircle className='text-[#ffffffe6] cursor-pointer' onClick={() => onRemoveIdImage(idImage[0])} size={30}/>
                  </div>
                </div>           
              )}
            </div>
            <div className='relative rounded-xl border-dashed  border-[0.1px] w-full h-[250px] p-4 flex flex-col items-center justify-center gap-3 border-[#202020]'>
              <BsCreditCard2Front size={40} />
              <label className={`font-medium text-lg`}>
                Upload back picture
                <input className='hidden cursor-pointer' type='file' name='property-images' onChange={onUploadID} accept='image/png, image/jpeg, image/jpg, image/webp' />
              </label>
              { idImage[1] && (
                <div className="absolute inset-0 w-full h-full">
                  <Image className='rounded-lg' fill style={{ objectFit: 'cover' }} src={`${URL.createObjectURL(idImage[1])}`} alt="Id-back" />
                  <div className='absolute top-3 right-3'>
                    <AiOutlineCloseCircle className='text-[#ffffffe6] cursor-pointer' onClick={() => onRemoveIdImage(idImage[1])} size={30}/>
                  </div>
                </div>           
              )}
            </div>
        </div>
        <div className='flex justify-between items-center w-full py-5 md:px-[100px] px-5 fixed bottom-0 z-10 bg-[#f5f5f5]'>
          <button onClick={() => router.push(`/rent-property/${currentUser?.id}/title-and-description`)} className={`rounded-lg border-[1.5px] border-[#202020] text-md bg-[#f5f5f5] transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-slate-900 to-gray-700 hover:text-white text-body px-6 py-3`}>
            Back
          </button>
          <button onClick={onNext} className={`rounded-lg text-md transition duration-500 ease-in-out bg-[#3AB0FF] hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-[#3AB0FF] to-blue-500 text-white px-6 py-3`}>
            Next
          </button>
        </div>
    </div>
  )
}

export default VerifyId