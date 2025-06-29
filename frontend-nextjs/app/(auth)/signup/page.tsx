"use client";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import AuthForm from "@/components/AuthForm";

const SignUp = () => {
  const { signUp } = useAuth();
  const { mutate: handleSignUp, isPending: isSigningUp } = signUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignUp({ email, password });
  };

  return (
    <AuthForm
      type="signup"
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      isSubmitting={isSigningUp}
    />
  );
};

export default SignUp;
