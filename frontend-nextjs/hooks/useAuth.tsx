import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { AUTH_API } from "../services/authService";
import { ROUTES } from "@/constants/routes";

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const signUp = () => {
    return useMutation({
      mutationFn: (payload: { email: string; password: string }) =>
        AUTH_API.signUp(payload),
      onSuccess: () => {
        alert("Account created successfully. Please sign in.");
        router.push(ROUTES.SIGN_IN);
      },
      onError: (error: any) => {
        console.log(error.error);
        const errorMessage = error?.error;
        alert(errorMessage);
        return;
      },
    });
  };

  const signIn = () => {
    return useMutation({
      mutationFn: (payload: { email: string; password: string }) =>
        AUTH_API.signIn(payload),
      onSuccess: (data: any) => {
        console.log("res", data);
        Cookies.set("accessToken", data.data.token);
        Cookies.set("username", data.data.username);
        setUser(data.data);
        router.push(ROUTES.ROOMS);
      },
      onError: (error: any) => {
        console.log(error.error);
        const errorMessage = error?.error;
        alert(errorMessage);
        return;
      },
    });
  };

  const logOut = () => {
    Cookies.remove("accessToken");
    Cookies.remove("username");
    setUser(null);
    router.push(ROUTES.SIGN_IN);
  };

  return { user, signUp, signIn, logOut };
};
