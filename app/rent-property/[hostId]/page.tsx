import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"
import Navbar from "@/app/components/Navbar"
import GetStarted from "./GetStarted"
import Container from "@/app/components/Container"

interface IParams {
    hostId?: string
}

const HostProperty = async ({ params } : { params : IParams}) => {
    
    const currentUser = await getCurrentUser()

    return (
        <ClientOnly>
            <Container>
                <GetStarted currentUser={currentUser} />
            </Container>
        </ClientOnly>
    )
}

export default HostProperty