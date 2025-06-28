import { apiClient } from "../lib/apiClient";

type User = {
  email: string, password: string 
}

export const AUTH_API = {
  signIn: async (data: User) => {
    return apiClient.post("/auth/signin", {
      ...data,
    });
  },
  signUp: async (data: User) => {
    return apiClient.post("/auth/signup", {
      ...data,
    });
  },
};
