"use client";
import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import CustomLink from "@/components/CustomLink";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const SignUp = () => {
  const { signUp } = useAuth();
  const { mutate: handleSignUp, isPending: isSigningUp } = signUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSignUp({ email, password });
  };

  return (
    <main className=" flex items-center justify-center ">
      <div className="w-full max-w-md bg-white border border-[#F0F8FF] shadow-lg rounded-xl p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Sign Up</h1>
          <p className="text-sm text-gray-500">
            Create an account to start chatting
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
            disabled={isSigningUp}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSigningUp ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {isSigningUp && (
          <div className="text-center text-sm text-gray-500">Processing...</div>
        )}

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <CustomLink
            href="/signin"
            label="Sign In"
            className="text-blue-600 hover:underline"
          />
        </p>
      </div>
    </main>
  );
};

export default SignUp;
