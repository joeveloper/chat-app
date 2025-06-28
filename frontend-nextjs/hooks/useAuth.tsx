import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AUTH_API } from "@/lib/api";
import Cookies from "js-cookie";
import { ROUTES } from "@/constants/routes";

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  const signUp = () => {
    return useMutation({
      mutationFn: (payload: {
        email: string;
        password: string;
      }) => AUTH_API.signUp(payload),
      onSuccess: () => {
        router.push(ROUTES.SIGN_UP);
      },
      onError: (error) => {
        console.error("Signup failed:", error);
        // You can replace this with toast or user feedback mechanism
      },
    });
  };

  const signIn = () => {
    return useMutation({
      mutationFn: (payload: { email: string; password: string }) =>
        AUTH_API.signIn(payload),
      onSuccess: (data: any) => {
        console.log('res', data)
        Cookies.set("accessToken", data.data.token);
        Cookies.set("username", data.data.username);
        setUser(data.data);
        router.push("/rooms");
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.data?.message || "Login failed. Please try again.";
        alert(errorMessage);
      },
    });
  };

  // const logIn = (userData: any) => {
  //   localStorage.setItem("token", userData.token);
  //   setUser(userData.user);
  //   router.push("/rooms");
  // };

  const logOut = () => {
    Cookies.remove("accessToken");
    setUser(null);
    router.push("/signin");
  };

  return { user, signUp, signIn, logOut };
};
