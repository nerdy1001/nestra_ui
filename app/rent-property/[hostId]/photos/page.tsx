import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"
import Photos from "./Photos"
import Container from "@/app/components/Container"

interface IParams {
    hostId?: string
}

const PhotosPage = async ({ params } : { params : IParams}) => {
    
    const currentUser = await getCurrentUser()

    return (
        <ClientOnly>
            <Container>
                <Photos currentUser={currentUser} />
            </Container>
        </ClientOnly>
    )
}

export default PhotosPage