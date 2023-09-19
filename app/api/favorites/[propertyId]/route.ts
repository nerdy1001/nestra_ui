import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import client from "@/app/libs/prismadb";

interface IParams {
  propertyId?: string;
}

export const POST = async (
  request: Request, 
  { params }: { params: IParams }
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { propertyId } = params;

  if (!propertyId || typeof propertyId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(propertyId);

  const user = await client.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}

export const DELETE = async (
  request: Request, 
  { params }: { params: IParams }
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { propertyId } = params;

  if (!propertyId || typeof propertyId !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== propertyId);

  const user = await client.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}