/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import useAuthModule from "../auth/lib";
// import { VerifyResponse } from "../auth/interface";
// import { useRouter } from "next/navigation";

const ResendEmailPage = () => {
  const [email, setEmail] = useState("");
  const { useResendVerification } = useAuthModule();
  const resendVerification = useResendVerification();
  // const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter your email address!",
      });
      return;
    }
    resendVerification.mutate(email);

    // resendVerification.mutate(email, {
    //   onSuccess: (response: VerifyResponse) => {
    //     setEmail(""); // Reset email field after success
    //     const token = response?.data?.verification_token; // Ambil token dari respons
    //     Swal.fire({
    //       title: "Success!",
    //       text:  `Your verification token is: ${token}`,
    //       icon: "success",
    //       confirmButtonText: "OK",
    //     }).then(() => {
    //       router.push("/auth/verify");
    //     });
    //   },
    //   onError: (error: any) => {
    //     console.error("Error during resend verification:", error);
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: error.response?.data?.message || "An error occurred!",
    //     });
    //   },
    // });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Resend Verification Email
        </h1>
        <p className="mt-2 text-sm text-center text-gray-600">
          Enter your email address to resend the verification email.
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={resendVerification.isPending}
          >
            {resendVerification.isPending ? "Sending..." : "Resend Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResendEmailPage;
