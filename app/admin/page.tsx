/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import useAuthModule from "../auth/lib";

const AdminPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { useProfileAdmin } = useAuthModule();

  // Redirect jika user bukan admin
  useEffect(() => {
    if (session?.user?.roles !== "admin") {
      router.push("/auth/login");
    }
  }, [session, router]);

  // Fetch data admin menggunakan useProfileAdmin
  const { data: admins, isLoading } = useProfileAdmin();

  console.log("Admin Data:", admins);

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
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm">Welcome, {session?.user?.name}</p>
      </header>

      <main className="mt-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Admin List</h2>
          <p className="text-gray-600 mt-2">Below is the list of all admins:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {admins?.data && admins?.data.length > 0 ? (
              admins?.data.map((data, id) => (
                <div
                  key={id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md p-4"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {data.name}
                  </h3>
                  <p className="text-sm text-gray-600">{data.email}</p>
                  <span className="inline-block mt-2 px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                    {data.role}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No admins found.</p>
            )}
          </div>
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
            title="List Member"
            colorSchema="blue"
            onClick={() => {
              router.push("/list/member");
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;