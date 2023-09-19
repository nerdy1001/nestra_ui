import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";
import { Be_Vietnam_Pro } from "next/font/google";
import Link from "next/link";
import { notFound } from "next/navigation"
import { AiOutlineContacts } from "react-icons/ai";
import { BiBuildingHouse } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { MdOutlineVisibility } from "react-icons/md";
import ContactTable from "../components/DataTable";
import CommentTable from "../components/CommentTable";

interface PageProps {
    params: {
        landlordId: string
    }
}

const Heading = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '500'
})

const Paragraph = Be_Vietnam_Pro({
    subsets: ['latin'],
    weight: '300'
})

const LandLordDashboardPage = async ({ params }: PageProps) => {
    const currentUser = await getCurrentUser()

    const property = !currentUser ? undefined : await client.property.findMany({
        where: {
            userId: params.landlordId
        },
        include: {
            comment: {
                include: {
                    author: {
                        select: {
                            name: true,
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            }
        }
    })

    const comments = !currentUser ? undefined : await client.comment.findMany({
        where: {
            property: {
                userId: params.landlordId
            }
        },
        include: {
            author: {
                select: {
                    name: true,
                    firstName: true,
                    lastName: true,
                    email: true
                }
            },
            property: {
                select: {
                    title: true
                }
            }
        }
    })

    const contacts = !currentUser ? undefined : await client.contact.findMany({
        where: {
            property: {
                userId: params.landlordId
            }
        },
        include: {
            contact: {
                select: {
                    firstName: true,
                    lastName: true,
                    name: true,
                    email: true,
                    phoneNumber: true,
                }
            },
            property: {
                select: {
                    title: true
                }
            },
        }
    })


    if (!property) return notFound()

    return (
        <div className="max-screen-xl">
            <div className="flex flex-col gap-10 pt-5">
                <h1 className={`text-xl text-[#202020] tracking-wide ${Heading.className}`}>
                    Welcome back {currentUser?.firstName},
                </h1>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <h1 className={`text-xl text-[#202020] tracking-wide ${Heading.className}`}>
                            An overview of all your statistics
                        </h1>
                        <p className={`text-sm text-[#747171] tracking-wide ${Paragraph.className}`}>
                            Click on an individual card to show its in depth statistics
                        </p>
                    </div>
                    <div className="md:grid xl:grid-cols-5 md:grid-cols-2 flex flex-col gap-5">
                        <div className="md:col-span-1 border-[1px] hover:border-[#202020] cursor-pointer rounded-md px-5 py-5 items-center">
                            <div className="flex flex-row gap-2">
                                <div className="p-3 rounded-full bg-[#f2f2f2]">
                                    <BiBuildingHouse className="text-[30px] text-[#202020]" />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <p className={`text-sm tracking-wide text-[#202020]${Paragraph.className}`}>
                                        Properties
                                    </p>
                                    <p className={`text-lg tracking-wide text-[#202020] ${Heading.className}`}>
                                        {property.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-1 border-[1px] hover:border-[#202020] cursor-pointer rounded-md px-5 py-5 items-center">
                            <div className="flex flex-row gap-2">
                                <div className="p-3 rounded-full bg-[#f2f2f2]">
                                    <MdOutlineVisibility className="text-[30px] text-[#202020]" />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <p className={`text-sm tracking-wide text-[#202020]${Paragraph.className}`}>
                                        Views
                                    </p>
                                    <p className={`text-lg tracking-wide text-[#202020] ${Heading.className}`}>
                                        25
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-1 border-[1px] hover:border-[#202020] cursor-pointer rounded-md px-5 py-5 items-center">
                            <div className="flex flex-row gap-2">
                                <div className="p-3 rounded-full bg-[#f2f2f2]">
                                    <FaRegCommentDots className="text-[30px] text-[#202020]" />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <p className={`text-sm tracking-wide text-[#202020]${Paragraph.className}`}>
                                        Comments
                                    </p>
                                    <p className={`text-lg tracking-wide text-[#202020] ${Heading.className}`}>
                                        {comments?.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-1 border-[1px] hover:border-[#202020] cursor-pointer rounded-md px-5 py-5 items-center">
                            <div className="flex flex-row gap-2">
                                <div className="p-3 rounded-full bg-[#f2f2f2]">
                                    <AiOutlineContacts className="text-[30px] text-[#202020]" />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <p className={`text-sm tracking-wide text-[#202020] ${Paragraph.className}`}>
                                        Contacts
                                    </p>
                                    <p className={`text-lg tracking-wide text-[#202020] ${Heading.className}`}>
                                        {contacts?.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className={`text-xl text-[#202020] tracking-wide ${Heading.className}`}>
                        Recently contacted you on WhatsApp
                    </h1>
                    <div className="w-full">
                        <ContactTable data={contacts} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandLordDashboardPage