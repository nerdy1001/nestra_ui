import { NextResponse, NextRequest } from "next/server";

import client from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (request: NextRequest,) => {

    const currentUser = await getCurrentUser()

    if(!currentUser) {
        return NextResponse.error()
    }

    const body = await request.json()
    body.amenities.shift()

    const {
        title,
        description,
        coverPhoto,
        otherPhotos,
        category,
        pricing,
        city,
        address,
        amenities,
        houseArrangement,
        houseRules,
        IdPhoto,
        IdCardNumber,
        extraFees
    } = body

    console.log(body)

    try {

        await client.property.create({
            data: {
                title,
                description,
                coverPhoto,
                otherPhotos,
                category,
                pricing,
                city,
                address, 
                amenities,
                houseArrangement,
                houseRules,
                IdPhoto,
                IdCardNumber,
                extraFees,
                userId: currentUser.id 
            }
        })
    
        const user = await client.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                isHost: true
            }
        })
        console.log('ok')

        return NextResponse.json(user)

    } catch (e) {
        console.log(e)
        return new Response('An error has occured in the server', { status: 500 })
    }
}
