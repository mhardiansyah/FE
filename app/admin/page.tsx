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
          <ul className="mt-4 space-y-2">
  {admins?.Admins && admins.Admins.length > 0 ? (
    admins.Admins.map((data, id) => (
      <li key={id} className="flex items-center">
        <span className="font-semibold">{data.name}</span>
        <span className="ml-2 text-gray-600">{data.email}</span>
      </li>
    ))
  ) : (
    <p className="text-gray-600">No admins found.</p>
  )}
</ul>
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            title="Logout"
            colorSchema="red"
            onClick={() => {
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
