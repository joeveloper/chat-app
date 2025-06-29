"use client";

import React, { FormEvent, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/AuthForm";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const { signIn } = useAuth();
  const [password, setPassword] = useState("");
  const { mutate: handleSignIn, isPending: isSigningIn } = signIn();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSignIn({ email, password });
  };

  return (
    <AuthForm
      type="signin"
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      isSubmitting={isSigningIn}
    />
  );
};

export default SignIn;
