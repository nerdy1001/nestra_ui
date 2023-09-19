import getCurrentUser from "@/app/actions/getCurrentUser"
import getListingsById from "@/app/actions/getListingById"
import ClientOnly from "@/app/components/ClientOnly"
import EmptyState from "@/app/components/EmptyState"
import PropertyDetails from "../PropertyDetails"
import Navbar from '@/app/components/Navbar';
import CommentSection from "@/app/components/CommentSection"
import client from "@/app/libs/prismadb"

interface IParams {
    propertyId: string
}


const PropertyPage = async ({ params }: { params: IParams }) => {

    const property = await getListingsById(params)
    const currentUser = await getCurrentUser()

    const comment = await client.comment.findMany({
        where: {
            propertyId: params.propertyId,
        },
        include: {
            author: true,
        }
    })

    if(!property) {
        return (
            <ClientOnly>
                <EmptyState title="Nothing to show" subtitle="This property has been deleted by its host." />
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
            <Navbar currentUser={currentUser} />
            <PropertyDetails comment={comment} property={property} currentUser={currentUser} />
        </ClientOnly>
    )
}

export default PropertyPage