import ClientOnly from './components/ClientOnly'
import Navbar from '@/app/components/Navbar';
import Container from './components/Container'
import EmptyState from './components/EmptyState'
import getListings, { IListingsParams } from './actions/getListings'
import PropertyCard from './components/properties/PropertyCard'

import getCurrentUser from './actions/getCurrentUser';

interface HomeProps {
  searchParams: IListingsParams
}

const Home = async ({ searchParams }: HomeProps) => {

  const propertyListings = await getListings(searchParams)
  const currentUser = await getCurrentUser()

  if(propertyListings?.length === 0) {
    return (
      <ClientOnly>
        <Navbar currentUser={currentUser} />
        <EmptyState title='Nothing to show' subtitle='Try changing your filters' showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Navbar currentUser={currentUser} />
      <Container>
        <div className='pt-[191px] pb-[30px] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {propertyListings?.map((property) => {
            return (
              <PropertyCard currentUser={currentUser} key={property.id} data={property} />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )

}

export default Home