import { apiClient } from "@/lib/apiClient";

export const ROOM_API = {
  getRooms: async () => {
    try {
      const response = await apiClient.get(`/rooms`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
      throw error;
    }
  },

  createRoom: async (name: string) => {
    try {
      const response = await apiClient.post(`/rooms/create-room`, { name });
      return response.data;
    } catch (error) {
      console.error("Failed to create room:", error);
      throw error;
    }
  },
};
