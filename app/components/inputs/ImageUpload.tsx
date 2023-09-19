'use client'

import React, { useCallback, useState} from 'react'
import Image from 'next/image'
import { Be_Vietnam_Pro } from "next/font/google"
import { IoImagesOutline, IoImageOutline } from 'react-icons/io5'

interface ImageUploadProps {
    onChange: (value: string) => void;
    value: [];
}

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
})

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {

    const [selectedImages, setSelectedImages] = useState([])

    let counter = 0

    const onSelectImage = (e: any) => {
        const selectedFiles = e.target.files

        const selectedFileArray = Array.from(selectedFiles)

        const imagesArray = selectedFileArray.map((file: any) => {
            return URL.createObjectURL(file)
        })

        setSelectedImages((previousImages: any) => previousImages.concat(imagesArray))

        counter = counter + 1

        console.log(counter)

        console.log(selectedImages)
    }

    return (
        <div className=''>
            <div className='relative cursor-pointer h-[45vh] rounded-lg hover:opacity-70 transition p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-[#202020]'>
                <IoImagesOutline size={50} />
                <label className={`font-medium text-lg ${beVietnamPro.className}`}>
                    Upload cover picture
                    <input className='hidden cursor-pointer' type='file' name='property-images' onChange={onSelectImage} multiple accept='image/png, image/jpeg, image/jpg, image/webp' />
                </label>
                { selectedImages[0] && (
                        <>
                            <div className="absolute inset-0 w-full h-full">
                                <Image className='rounded-lg' fill style={{ objectFit: 'cover' }} src={selectedImages[0]} alt="House" />
                            </div>
                            
                        </>
                    )
                }
            </div>
            <div className='grid grid-cols-1 cursor-pointer md:grid-cols-2 gap-3 mt-5 max-h-[50vh] overflow-y-auto'>
                {selectedImages && selectedImages.map((images, index) => {
                    return (
                        <div key={index} className='relative rounded-xl border-dashed  border-[0.1px] w-full h-[200px] p-4 flex flex-col items-center justify-center gap-3 border-[#202020]'>
                            <IoImageOutline size={40} />
                            <label className={`font-medium text-lg ${beVietnamPro.className}`}>
                                Add picture
                                <input className='hidden cursor-pointer' type='file' name='property-images' onChange={onSelectImage} multiple accept='image/png, image/jpeg, image/jpg, image/webp' />
                            </label>
                            { selectedImages[index + 1] && (
                                <>
                                    <div className="absolute inset-0 w-full h-full">
                                        <Image className='rounded-lg' fill style={{ objectFit: 'cover' }} src={`${selectedImages[index + 1]}`} alt="House" />
                                    </div>
                                
                                </>
                            )}
                        </div> 
                    )
                })}            
            </div>
        </div>     
    )
}

export default ImageUpload