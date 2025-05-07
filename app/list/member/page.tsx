/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import useAuthModule from '@/app/auth/lib';
import { rolepayload } from '@/app/auth/interface';

const Member = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const {useProfileMember} = useAuthModule()

  // Redirect jika user tidak memiliki role user atau admin
  useEffect(() => {
    if (!session?.user?.roles || !['user', 'admin'].includes(session.user.roles)) {
      router.push("/auth/login");
    }
  }, [session, router]);

  // Menggunakan hook useProfileMember
  const { data, isLoading } = useProfileMember();

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
          <p className="text-gray-600 mt-2">Below is the list of all members:</p>
          <ul className="mt-4 space-y-2">
            {data?.data?.map((member: rolepayload, index: number) => (
              <li
                key={index}
                className="p-4 bg-gray-100 rounded-md shadow-sm flex justify-between items-center"
              >
                <span>{member.name}</span>
                <span className="text-gray-500 text-sm">{member.email}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            title="Logout"
            colorSchema="red"
            onClick={() => {
              router.push("/auth/logout");
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default Member;