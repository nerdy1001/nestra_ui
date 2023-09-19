import ClientOnly from "@/app/components/ClientOnly"
import Navbar from "@/app/components/Navbar"
import client from "@/app/libs/prismadb"
import UserAccount from "./UserAccount"

interface IParams {
    userId: string
}

const ContactLandlordPage = async ({ params }: { params: IParams}) => {

    const user = await client.user.findUnique({
        where: {
            id: params.userId
        },
        include: {
            properties: {
                include: {
                    comment: true
                }
            },
        }
    })

    const comments = await client.comment.findMany({
        where: {
            property: {
                userId: params.userId
            } 
        }
    })

    return (
        <ClientOnly>
            <Navbar isUserAccountPage />
            <UserAccount user={user} comments={comments} />
        </ClientOnly>
    )
}

export default ContactLandlordPage