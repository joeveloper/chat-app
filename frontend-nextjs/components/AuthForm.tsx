"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import CustomLink from "./CustomLink";

interface AuthFormProps {
  type: "signin" | "signup";
  email: string;
  password: string;
  username?: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onUsernameChange?: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  type,
  email,
  password,
  username,
  onEmailChange,
  onPasswordChange,
  onUsernameChange,
  onSubmit,
  isSubmitting,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isSignIn = type === "signin";

  return (
    <main className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white border border-[#F0F8FF] shadow-lg rounded-xl p-8 space-y-6">
        {" "}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-sm text-gray-500">
            {isSignIn
              ? "Welcome back! Please enter your credentials."
              : "Create an account to get started."}
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting
              ? isSignIn
                ? "Signing in..."
                : "Signing up..."
              : isSignIn
              ? "Sign In"
              : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
          <CustomLink
            href={isSignIn ? "/signup" : "/signin"}
            label={isSignIn ? "Sign Up" : "Sign In"}
            className="text-blue-600 hover:underline"
          />
        </p>
      </div>
    </main>
  );
};

export default AuthForm;
