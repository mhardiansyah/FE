"use client"
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Button from "@/components/Button"
import useAuthModule from "../auth/lib"

const UserPage = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const { useProfile } = useAuthModule()

  // Redirect jika user tidak memiliki session
  useEffect(() => {
    if (!session) {
      router.push("/auth/login")
    }
  }, [session, router])

  // Fetch data user menggunakan useProfile
  const { data: user, isLoading } = useProfile()

  console.log("User Data:", user)

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
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
          <p className="text-gray-600 mt-2">Below is your profile information:</p>
          {user ? (
            <div className="mt-4 space-y-2">
              <p>
                <span className="font-semibold text-black">Name:</span>
                <span className="font-semibold text-black">{session?.user.name}</span>

                 
              </p>
              <p>
                <span className="font-semibold text-black">Email:</span> 
                <span className="font-semibold text-black">{session?.user.email}</span>
              </p>
              <p>
                <span className="font-semibold text-black">Role:</span> 
                <span className="font-semibold text-black">{session?.user.roles}</span>
              </p>
            </div>
          ) : (
            <p className="text-gray-600">No user data found.</p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            title="Logout"
            colorSchema="red"
            onClick={() => {
              signOut()
            }}
          />
          <Button
            title="Go to Dashboard"
            colorSchema="blue"
            onClick={() => {
              router.push("/")
            }}
          />
        </div>
      </main>
    </div>
  )
}

export default UserPage