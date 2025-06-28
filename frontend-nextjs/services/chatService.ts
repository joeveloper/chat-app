import { apiClient } from "@/lib/apiClient";
import Cookies from "js-cookie";

export const CHAT_API = {
  fetchMessages: async (roomId: string) => {
    try {
      const response = await apiClient.get(`/chats/messages/${roomId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  },

  sendMessageToApi: async (roomId: string, content: string) => {
    try {
      const token = Cookies.get("accessToken");
      await apiClient.post(
        `/chats/send-messages/${roomId}`,
        { roomId, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error saving message:", error);
    }
  },
};
