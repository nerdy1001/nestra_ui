import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/app/types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  propertyId: string;
  currentUser?: SafeUser | null
}

const useFavorite = ({ propertyId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(propertyId);
  }, [currentUser, propertyId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFavorite) {
        request = () => axios.delete(`/api/favorites/${propertyId}`);
        await request();
      } else {
        request = () => axios.post(`/api/favorites/${propertyId}`);
        await request();
        toast.success('Saved to your favorites');
      }

      await request();
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong.');
    }
  }, 
  [
    currentUser, 
    isFavorite, 
    propertyId, 
    loginModal,
    router
  ]);

  return {
    isFavorite,
    toggleFavorite,
  }
}

export default useFavorite;