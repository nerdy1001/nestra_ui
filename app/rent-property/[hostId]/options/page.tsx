import getCurrentUser from "@/app/actions/getCurrentUser"
import ClientOnly from "@/app/components/ClientOnly"
import Navbar from "@/app/components/Navbar"
import Options from "./Options"
import Container from "@/app/components/Container"

import { Be_Vietnam_Pro } from "next/font/google"

interface IParams {
    hostId?: string
}

const SubHeading = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '500'
})

const OptionsPage = async ({ params } : { params : IParams}) => {
    
    const currentUser = await getCurrentUser()

    return (
        <ClientOnly>
            <Container>
                <Options currentUser={currentUser} />
            </Container>
        </ClientOnly>
    )
}

export default OptionsPage