import client from "../libs/prismadb"

export interface IListingsParams {
    address?: string;
    city?: string;
    price: string;
    category?: string
}

const getListings = async ( params: IListingsParams ) => {

    try {

        const { city, address, category, price } = params


        let query: any = {}

        if (city) {
            query.city = city
        }

        if (price) {
            query.price = price
        }

        if (address) {
            query.address = address
        }

        if (category) {
            query.category = category
        }

        console.log(query)

        const propertyListings = await client.property.findMany({
            where: {
                city: {
                    contains: city 
                },
                address: {
                    contains: address 
                },
                category: {
                    contains: category
                },
                pricing: {
                    some: {
                        price: price
                    }
                }
            },
            orderBy: {
                createdAt: 'asc'
            }
        })

        const safeListings = propertyListings.map((property) => ({
            ...property,
            createdAt: property.createdAt.toISOString()
        }))

        return safeListings;
    } catch (e: any) {
        return null
    }
}

export default getListings