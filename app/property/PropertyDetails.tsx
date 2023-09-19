'use client'

import React from 'react'
import { CommentType, SafeListings, SafeUser } from '../types'
import Container from '../components/Container'
import PropertyDetailsHeader from '../components/properties/PropertyDetailsHeader'
import PropertyInformation from '../components/properties/PropertyInformation'

interface PropertyDetailsProps {
    property: SafeListings & {
        user: SafeUser
    }
    currentUser?: SafeUser | null
    comment: CommentType[]
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, currentUser, comment }) => {
    
  return (
    <Container>
        <div className='md:max-w-[1100px] max-w-screen-md mx-auto pt-[105px]'>
            <div className='flex flex-col gap-6'>
                <PropertyDetailsHeader title={property.title} coverPhoto={property.coverPhoto} otherPhotos={property.otherPhotos} location={property.address} id={property.id} currentUser={currentUser} />
                <div className='grid md:grid-cols-3 md:gap-10 mt-2'>
                    <PropertyInformation currentUser={currentUser} landlord={property.user.id} comment={comment} propertyId={property.id} extraFees={property.extraFees} amenities={property.amenities} pricing={property.pricing} houseArrangement={property.houseArrangement} houseRules={property.houseRules} category={property.category} title={property.title} user={property.user} description={property.description} location={property.address} />
                </div>
            </div>
        </div>
    </Container>
  )
}

export default PropertyDetails