import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"
import Navbar from "@/app/components/Navbar"
import Location from "./Location"
import Container from "@/app/components/Container"

interface IParams {
    hostId?: string
}

const LocationPage = async ({ params } : { params : IParams}) => {
    
    const currentUser = await getCurrentUser()

    return (
        <ClientOnly>
            <Container>
                <Location currentUser={currentUser} />
            </Container>
        </ClientOnly>
    )
}

export default LocationPage