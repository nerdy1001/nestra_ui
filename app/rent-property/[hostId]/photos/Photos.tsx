'use client'

import { useState } from 'react'
import { SafeUser } from '@/app/types'
import { FC } from 'react'
import { Be_Vietnam_Pro } from "next/font/google"
import { IoImagesOutline, IoImageOutline } from 'react-icons/io5'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { storage } from '@/app/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setCoverPhoto, setOtherPhotos } from '@/app/reducers/property/propertySlice'

interface PhotosProps {
  currentUser: SafeUser | null
}

const Heading = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '700'
  })
  
  const SubHeading = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '500'
  })
  
  const Subtitle = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '400'
  })

const Photos: FC<PhotosProps> = ({ currentUser }) => {

    const router = useRouter()
    const dispatch = useDispatch()

    const [selectedImages, setSelectedImages] = useState<any>([])
    const [idImage, setIdImage] = useState<any>([])
    const [isImagesUploaded, setIsImagesUploaded] = useState(false)
    const [coverPhotoUrl, setCoverPhotoUrl] = useState('')
    const [otherPhotosUrl, setOtherPhotosUrl] = useState([''])
    const [progress, setProgress] = useState(Number)

    const onSelectImage = (e: any) => {
        for (let i = 0; i < e.target.files.length; i++) {
          const newImage = e.target.files[i];
          setSelectedImages((prevState: any[]) => [...prevState, newImage]);
        }
      }
  
    const onRemoveImage = (image: any) => {
        setSelectedImages(selectedImages.filter((e: any) => e !== image));
    }

    const onNext = () => {

        const promises = []
        const coverPhoto: any = selectedImages[0]

        const coverPhotoRef = ref(storage, `coverPhotos/${coverPhoto.name}`)
        const uploadTask = uploadBytesResumable(coverPhotoRef, coverPhoto)
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
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
              dispatch(setCoverPhoto(downloadUrl))
            })
          }
        )

        selectedImages.shift()
        selectedImages.map((image: any) => {
          const storageRef = ref(storage, `otherPhotos/${image.name}`)
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
                dispatch(setOtherPhotos(downLoadUrl))
              })
            }
          )
        })
        router.push(`/rent-property/${currentUser?.id}/title-and-description`)
        setIsImagesUploaded(true)
    }


    

  return (
        <div className='max-w-screen-xl mx-auto py-[110px] md:pt-[120px] gap-8 flex flex-col justify-center items-center'>
            <h1 className={`${SubHeading.className} md:text-[30px] text-[28px] text-body text-center`}>
                What does your property look like ?
            </h1>
            <div className='md:w-[52vw] h-full w-[93vw]'>
                <div className='relative cursor-pointer h-[45vh] rounded-lg hover:opacity-70 transition p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-[#202020]'>
                    <IoImagesOutline size={50} />
                    <label className={`font-medium text-center text-lg ${Subtitle.className}`}>
                        Upload cover picture
                        <input className='hidden cursor-pointer' type='file' name='property-images' onChange={onSelectImage} multiple accept='image/png, image/jpeg, image/jpg, image/webp' />
                    </label>
                    { selectedImages[0] && (
                    <div className="absolute inset-0 w-full h-full">
                        <Image className='rounded-lg' fill style={{ objectFit: 'cover' }} src={selectedImages[0] && URL.createObjectURL(selectedImages[0])} alt="House" />
                        <div className='absolute top-3 right-3'>
                            <AiOutlineCloseCircle className='text-[#ffffffe6] cursor-pointer' onClick={() => onRemoveImage(selectedImages[0])} size={25}/>
                        </div>
                    </div>            
                    )}
                </div>
                <div className='grid grid-cols-1 cursor-pointer md:grid-cols-2 gap-3 mt-5 mb-10 max-h-[60vh]'>
                {selectedImages && selectedImages.map((image: any, index: any) => {
                    return (
                        <div key={index} className='relative rounded-xl border-dashed  border-[0.1px] w-full h-[300px] p-4 flex flex-col items-center justify-center gap-3 border-[#202020]'>
                            <IoImageOutline size={40} />
                            <label className={`font-medium text-lg ${Subtitle.className}`}>
                                Add picture
                                <input className='hidden cursor-pointer' type='file' name='property-images' onChange={onSelectImage} multiple accept='image/png, image/jpeg, image/jpg, image/webp' />
                            </label>
                            { selectedImages[index + 1] && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image className='rounded-lg' fill style={{ objectFit: 'cover' }} src={`${URL.createObjectURL(selectedImages[index + 1])}`} alt="House" />
                                <div className='absolute top-3 right-3'>
                                    <AiOutlineCloseCircle className='text-[#ffffffe6] cursor-pointer' onClick={() => onRemoveImage(selectedImages[index + 1])} size={25}/>
                                </div>
                            </div>                              
                            )}
                        </div> 
                    )})}            
                </div>
            </div>
            <div className='flex justify-between items-center w-full py-5 md:px-[100px] px-5 fixed bottom-0 z-10 bg-[#f5f5f5]'>
                <button onClick={() => router.push(`/rent-property/${currentUser?.id}/amenities`)} className={`rounded-lg border-[1.5px] border-[#202020] text-md bg-[#f5f5f5] transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-slate-900 to-gray-700 hover:text-white text-body px-6 py-3 ${Subtitle.className}`}>
                    Back
                </button>
                <button onClick={onNext} className={`rounded-lg text-md transition duration-500 ease-in-out bg-[#3AB0FF] hover:-translate-y-1 hover:scale-110 hover:bg-gradient-to-r from-[#3AB0FF] to-blue-500 text-white px-6 py-3 ${Subtitle.className}`}>
                    Next
                </button>
            </div>
        </div>
  )
}

export default Photos