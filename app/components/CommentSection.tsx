'use client'

import { FC, useState } from 'react'
import CreateComment from "./CreateComment";
import { CommentType } from '../types';
import PropertyComment from './PropertyComment';

interface CommentSectionProps {
    propertyId: string;
    currentUser?: string;
    landlord: string;
    comment: CommentType[]
}

const CommentSection: FC<CommentSectionProps> = ({ propertyId, comment, landlord, currentUser }) => {

    return (
        <div className="flex flex-col gap-5 mt-1">
            <div className='grid grid-cols-1 gap-5 overflow-y-auto max-h-[400px]'>
                {comment.map((item) => (
                    <PropertyComment key={item.id} profile={item.author.image} comment={item.text} author={item.author.firstName} date={item.createdAt} />
                ))}
            </div>
            { currentUser !== landlord ? (
                <CreateComment propertyId={propertyId} />
            ) : null }
        </div>
    )
}

export default CommentSection