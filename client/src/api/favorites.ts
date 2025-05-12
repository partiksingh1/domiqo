import axios from "axios";

export const fetchFavoritesApi = async (userId: string) => {
  const { data } = await axios.get(`http://localhost:3000/api/v1/favorites`,{
    headers: {
        "user-id": userId, // Set user-id in headers
      },
  });
  return data.favorites;
};

export const removeFavoriteApi = async (favoriteId: number) => {
  await axios.delete(`http://localhost:3000/api/v1/favorites/${favoriteId}`);
};
