import ClientOnly from "@/app/components/ClientOnly"
import Navbar from "@/app/components/Navbar"
import client from "@/app/libs/prismadb"
import ContactLandlord from "./ContactLandlord"

interface IParams {
    landlordId: string
}

const ContactLandlordPage = async ({ params }: { params: IParams}) => {

    const landlord = await client.user.findUnique({
        where: {
            id: params.landlordId
        },
        include: {
            properties: true
        }
    })

    //Todo: const property = await client.property.findMany()
    //Todo: where: { id: params.landlordId }
    //Todo: include: { user: true }
    //Todo: select firstName, lastName, phoneNo, createdAt from user 

    return (
        <ClientOnly>
            <Navbar isContactPage />
            <ContactLandlord landlord={landlord} />
        </ClientOnly>
    )
}

export default ContactLandlordPage