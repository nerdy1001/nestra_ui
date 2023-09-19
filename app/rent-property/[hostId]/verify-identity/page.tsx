import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"
import Container from "@/app/components/Container"
import VerifyId from "./VerifyId"

const VerifyIdPage = async () => {

    const currentUser = await getCurrentUser()
    return (
        <ClientOnly>
            <Container>
                <VerifyId currentUser={currentUser} />
            </Container>
        </ClientOnly>
    )
}

export default VerifyIdPage