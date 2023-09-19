'use client'

import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import useLoginModal from '../hooks/useLoginModal'

interface CreateCommentProps {
  propertyId: string
}

const CreateComment: FC<CreateCommentProps> = ({ propertyId }) => {
    const [input, setInput] = useState('')
    
    const router = useRouter()
    const loginModal = useLoginModal()

    const {mutate: comment, isLoading } = useMutation({
        mutationFn: async ({ propertyId, text }: any) => {
            const payload = {
                propertyId,
                text
            }

            const { data } = await axios.patch(`/api/listings/comment`, payload)

            return data
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if(err.response?.status === 401 ) {
                    return toast.error('You must be logged in to comment')
                }
            }
            return toast.error('Could not comment.')
        },
        onSuccess: () => {
            router.refresh()
            setInput('')
            return toast.success('Comment posted.')
        }
    })
  return (
    <div className='w-full gap-1.5'>
        <div className='mt-5 w-full'>
            <textarea defaultValue={input} onChange={(e) => setInput(e.target.value)} cols={40} rows={2} className='p-3 border-[1.5px] rounded-md w-full' placeholder='Share your thoughts on this property'></textarea>
        </div>
        <div className='mt-2'>
            <button disabled={input.length === 0} onClick={() => comment({ propertyId, text: input })} className='w-full bg-[#3AB0FF] text-white p-3 rounded-md cursor-pointer'>
                Comment
            </button>
        </div>
    </div>
  )
}
export default CreateComment