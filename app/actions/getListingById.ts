import client from "../libs/prismadb";

interface IParams {
    propertyId?: string
}

const getListingsById = async (
    params: IParams
) => {
    try {
        const { propertyId } = params

        const property = await client.property.findUnique({
            where: {
                id: propertyId
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

export default getListingsById