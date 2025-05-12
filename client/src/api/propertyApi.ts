import axios from "axios"
import type { Property } from "@/types/property"
export const getPropertyById = async (id: string | undefined): Promise<Property> => {
  const response = await axios.get(`http://localhost:3000/api/v1/findPropertyById/${id}`)
  return response.data
}

export const saveProperty = async (propertyId: number, userId: number) => {
  return axios.post(
    `http://localhost:3000/api/v1/favorites/${propertyId}`,
    { user_id: userId },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  )
}

export const startChatWithOwner = async (userId: number, ownerId: number) => {
  const response = await axios.post(`http://localhost:3000/api/v1/chats`, {
    userIds: [userId, ownerId],
  })

  return response.data
}
