import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        const body = await req.json()

        const { propertyId, text } = body
        const currentUser = await getCurrentUser()

        if (!currentUser) {
            return new Response('unauthorized', { status: 401 })
        }

        await client.comment.create({
            data: {
                text,
                propertyId,
                authorId: currentUser.id
            }
        })

        return new Response('OK')
    } catch (error) {
        return new Response('Could not create comment at this time due to an error in the server', { status: 500 })
    }
}