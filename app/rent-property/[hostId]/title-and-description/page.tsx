import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"
import Container from "@/app/components/Container"
import TitleAndDescription from "./TitleAndDescription"


const TitlePage = async () => {

    const currentUser = await getCurrentUser()

  return (
    <ClientOnly>
        <Container>
            <TitleAndDescription currentUser={currentUser} />
        </Container>
    </ClientOnly>
  )
}

export default TitlePage