import React from 'react'
import getCurrentUser from '@/app/actions/getCurrentUser'
import Container from '@/app/components/Container'
import ClientOnly from '@/app/components/ClientOnly'
import Navbar from '@/app/components/Navbar'
import AboutProperty from './AboutProperty'

interface IParams {
  hostId?: string
}

const AboutPropertyPage = async ({ params } : { params: IParams }) => {

  const currentUser = await getCurrentUser()

  return (
    <ClientOnly>
      <Container>
        <AboutProperty currentUser={currentUser} />
      </Container>
    </ClientOnly>
  )
}

export default AboutPropertyPage