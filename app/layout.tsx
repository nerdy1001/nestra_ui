import { Be_Vietnam_Pro } from "next/font/google"

import RegisterModal from '@/app/components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import ToasterProvider from '@/app/providers/ToasterProvider';
import ClientOnly from './components/ClientOnly';
import './globals.css'
import getCurrentUser from './actions/getCurrentUser';
import DescriptionModal from './components/modals/DescriptionModal';
import AuthContext from "./providers/SessionProvider";
import { Providers } from "./reducers/provider";
import QueryProvider from "./components/Provider";
import SearchModal from "./components/modals/SearchModal";

export const metadata = {
  title: 'Nestra: Find your dream home',
  description: 'Nestra_UI',
}

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: '400'
})

const RootLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {

  const currentUser = await getCurrentUser()
  
  return (
      <html lang="en">
        <body className={`${beVietnamPro.className} bg-[#fefefe] antialiased`}>
          <Providers>
            <QueryProvider>
              <AuthContext>          
                <ClientOnly>
                  <ToasterProvider />
                  <SearchModal />
                  <LoginModal />
                  <RegisterModal />
                  <DescriptionModal />
                </ClientOnly>
                <div>
                  {children}
                </div>
              </AuthContext>
            </QueryProvider>
          </Providers>
        </body>
      </html>
  )
}

export default RootLayout
