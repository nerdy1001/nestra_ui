import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { Be_Vietnam_Pro, Fredoka } from "next/font/google";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx"
import { notFound } from "next/navigation"
import { AiOutlineContacts, AiOutlineBarChart } from "react-icons/ai";
import { BsHouse } from "react-icons/bs";
import { BiBuildingHouse, BiUserCircle } from "react-icons/bi";
import { IoExitOutline } from "react-icons/io5";

export const metadata = {
    title: 'Landlord - Home',
    description: 'Nestra_UI',
  }

const fredoka = Fredoka({
    subsets: ['latin'],
    weight: '600'
})

const LandLordLayout = async ({
    children,
    params: { landlordId }
} : {
    children: React.ReactNode,
    params: { landlordId: string }
}) => {
    const currentUser = await getCurrentUser()

    const property = !currentUser ? undefined : await client.property.findMany({
        where: {
            userId: landlordId
        },
        include: {
            comment: true
        }
    })

    if (!property) return notFound()

    return (
        <div className="grid xl:grid-cols-6 md:grid-cols-4  bg-white min-h-screen">
            <div className="hidden md:block col-span-1 sticky top-0 shadow-lg">
                <div className="flex flex-col gap-10 pt-5 mx-8">
                    <Link href={'/'} className={`text-2xl text-[#3AB0FF] cursor-pointer ${fredoka.className}`}>
                        nestra
                    </Link>
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-row items-center gap-2">
                            <RxDashboard className="text-md text-[#202020]" />
                            <p className="text-md cursor-pointer text-[#202020] tracking-wide">
                                Dashboard
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <BiBuildingHouse className="text-md text-[#202020]" />
                            <p className="text-md cursor-pointer text-[#202020] tracking-wide">
                                Properties
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <AiOutlineContacts className="text-md text-[#202020]" />
                            <p className="text-md cursor-pointer text-[#202020] tracking-wide">
                                Contacts
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <AiOutlineBarChart className="text-md text-[#202020]" />
                            <p className="text-md cursor-pointer text-[#202020] tracking-wide">
                                Statistics
                            </p>
                        </div>
                        <hr />
                        <div className="flex flex-row items-center gap-2">
                            <BiUserCircle className="text-md text-[#202020]" />
                            <p className="text-md cursor-pointer text-[#202020] tracking-wide">
                                Profile
                            </p>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <IoExitOutline className="text-md text-[#202020]" />
                            <p className="text-md cursor-pointer text-[#202020] tracking-wide">
                                Exit
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:col-span-3 xl:col-span-5 col-span-6 md:mx-10 mx-5 max-w-screen-xl">
                {children}
            </div>
        </div>
    )
}

export default LandLordLayout