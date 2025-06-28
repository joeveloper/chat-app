"use client";
import React from "react";
import CustomLink from "@/components/CustomLink";

const Home = () => {
  const linkMenu = [
    { label: "Sign Up", link: "/signup" },
    { label: "Sign In", link: "/signin" },
  ];

  return (
    <main className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 px-4">
      <div className="text-center bg-white rounded-xl shadow-lg p-10 max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-blue-800">
          Welcome to Real-Time Chat
        </h2>
        <p className="text-gray-600 text-sm">
          Experience seamless, real-time conversations like never before.
        </p>
        <div className="flex justify-center gap-4">
          {linkMenu.map(({ label, link }) => (
            <CustomLink
              key={label}
              href={link}
              label={label}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
