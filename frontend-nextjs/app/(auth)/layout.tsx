import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      {/* <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8"> */}
        {children}
      {/* </div> */}
    </div>
  );
}
