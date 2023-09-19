import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"
import Container from "@/app/components/Container"
import Navbar from "@/app/components/Navbar"

export const metadata = {
    title: 'Nestra - Onboarding',
    description: 'Nestra_UI',
  }

const Layout = async ({
    children,
    params: { hostId }
}: {
    children: React.ReactNode,
    params: { hostId: string }
}) => {
    const currentUser = await getCurrentUser()

    return (
        <ClientOnly>
            <Navbar currentUser={currentUser} isHostingPage />
            <Container>
                {children}
            </Container>
        </ClientOnly>
    )
}

export default Layout