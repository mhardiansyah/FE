/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import useAuthModule from "@/app/auth/lib";

const Member = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { useProfileMember } = useAuthModule();

  // Redirect jika user tidak memiliki role user atau admin
  useEffect(() => {
    if (
      !session?.user?.roles ||
      !["user", "admin"].includes(session.user.roles)
    ) {
      router.push("/auth/login");
    }
  }, [session, router]);

  // Menggunakan hook useProfileMember
  const { data: Members, isLoading } = useProfileMember();
  console.log("Member Data:", Members);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="bg-blue-600 text-white py-4 px-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold">Member Dashboard</h1>
        <p className="text-sm">Welcome, {session?.user?.name}</p>
      </header>

      <main className="mt-6">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold text-gray-800">Member List</h2>
          <p className="text-gray-600 mt-2">
            Below is the list of all members:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {Members && Members.length > 0 ? (
              Members.map((data, id) => (
                <div
                  key={id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md p-4 flex flex-col items-start"
                >
                  <h3 className="text-lg font-semibold text-blue-600">
                    {data.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold">Role:</span> {data.role}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-semibold">Email:</span> {data.email}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 col-span-full">No members found.</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            title="Logout"
            colorSchema="red"
            onClick={() => {
              localStorage.removeItem("access_token");
              signOut();
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Member;
