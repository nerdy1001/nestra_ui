import client from "@/app/libs/prismadb";

import getCurrentUser from "./getCurrentUser";

const getWishList = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await client.property.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    return null
  }
}

export default getWishList