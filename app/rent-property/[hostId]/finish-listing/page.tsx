import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"
import Container from "@/app/components/Container"
import FinishListing from "./FinishListing"

interface IParams {
    hostId?: string
}

const FinishPage = async ({ params } : { params : IParams}) => {
    
    const currentUser = await getCurrentUser()

    return (
        <ClientOnly>
            <Container>
                <FinishListing currentUser={currentUser} />
            </Container>
        </ClientOnly>
    )
}

export default FinishPage