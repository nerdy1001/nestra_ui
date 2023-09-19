import client from "../libs/prismadb";

interface IUser {
    userId?: string | undefined
}

const getListingsByUser = async (
    UserId: IUser
) => {
    try {
        const { userId } = UserId

        const property = await client.property.findFirst({
            where: {
                userId: userId
            },
            include: {
                user: true
            }
        })

        if (!property) {
            return null;
        }

        return {
            ...property,
            createdAt: property.createdAt.toISOString(),
            user: {
                ...property.user,
                createdAt: property.user.createdAt.toISOString(),
                updatedAt: property.user.updatedAt.toISOString(),
                emailVerified: property.user.emailVerified?.toISOString() || null,
            }
        }
    } catch (error: any) {
        return null
    }
}

export default getListingsByUser