"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import useAuthModule from "../auth/lib";

const UserPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { useProfile } = useAuthModule();

  // Redirect jika user tidak memiliki session
  useEffect(() => {
    if (!session) {
      router.push("/auth/login");
    }
  }, [session, router]);

  // Fetch data user menggunakan useProfile
  const { data: user, isLoading } = useProfile();

  console.log("User Data:", user);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="bg-blue-600 text-white py-4 px-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <p className="text-sm">Welcome, {session?.user?.name}</p>
      </header>

      <main className="mt-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">User Profile</h2>
          <p className="text-gray-600 mt-2">
            Below is your profile information:
          </p>
          {user ? (
            <div className="mt-4">
              <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
                    {session?.user.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {session?.user.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {session?.user.email}
                    </p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <p>
                    <span className="font-semibold text-gray-700">Name:</span>{" "}
                    <span className="text-gray-800">{session?.user.name}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Email:</span>{" "}
                    <span className="text-gray-800">{session?.user.email}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Role:</span>{" "}
                    <span className="text-gray-800">{session?.user.roles}</span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No user data found.</p>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <Button
            title="Logout"
            colorSchema="red"
            onClick={() => {
              localStorage.removeItem("access_token");

              signOut();
            }}
          />
          <Button
            title="Go to Dashboard"
            colorSchema="blue"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default UserPage;
