import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { BsChatDots } from 'react-icons/bs'
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineHome } from "react-icons/ai"
import useChat from "./useChat";

const useRoutes = () => {
    const pathName = usePathname()
    const { chatId } = useChat()

    const routes = useMemo(() => [
        {
           label: 'Chats',
           href: '/inbox/tenant/chats',
           icon: BsChatDots,
           active: pathName === '/inbox/tenant/chats' || !!chatId 
        },
        {
            label: 'Starred',
            href: '/inbox/tenant/starred',
            icon: AiOutlineStar,
            active: pathName === '/inbox/tenant/starred' 
        },
        {
            label: 'Continue search',
            href: '/',
            icon: AiOutlineHome, 
        }
    ], [pathName, chatId])

    return routes
}

export default useRoutes