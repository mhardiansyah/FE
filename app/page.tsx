"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-blue-600">Welcome to the Dashboard</h1>
        <p className="text-lg mb-6 text-gray-700">Please choose an action below:</p>
        <div className="flex space-x-4">
          <Button
            title="Login"
            colorSchema="red"
            onClick={() => {
              router.push("/auth/login");
            }}
          />
          <Button
            title="Register"
            colorSchema="green"
            onClick={() => {
              router.push("/auth/register");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
