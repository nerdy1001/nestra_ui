import bcrypt from 'bcrypt'

import client from '../../libs/prismadb'
import { NextResponse } from 'next/server'

export const POST = async (request: Request) => {

    const body = await request.json()
    const { email, phoneNumber, firstName, lastName, password } = body

    const name = firstName + ' ' + lastName
    console.log(name)

    const hashedPassword = await bcrypt.hash(password, 12)

    console.log(hashedPassword)

    const user = await client.user.create({
        data: {
            email,
            phoneNumber,
            name,
            firstName,
            lastName,
            hashedPassword
        }
    })

    return NextResponse.json(user)

}
