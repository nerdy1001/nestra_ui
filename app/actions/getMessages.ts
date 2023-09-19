import client from "../libs/prismadb";

const getMessages = async ( chatId: string ) => {
    try {
        const messages = await client.message.findMany({
            where: {
                chatId: chatId
            },
            include: {
                sender: true,
                seen: true,
            }, 
            orderBy: {
                createdAt: 'asc'
            }
        })

        return messages
    } catch (error: any) {
        return []
    }
}

export default getMessages