'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Swal from 'sweetalert2';
import useAuthModule from "@/app/auth/lib";
import Button from '@/components/Button';
const VerifyEmailPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [manualToken, setManualToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
    const { useVerify } = useAuthModule();
  const { mutate: verifyEmail } = useVerify();

  const handleVerify = (token: string) => {
    verifyEmail(
      { verification_token: token }, // Sesuaikan dengan interface VerifiyPayload
      {
        onSuccess: () => {
          setStatus('success');
          Swal.fire({
            title: 'Success!',
            text: 'Your email has been verified successfully.',
            icon: 'success',
          });
        },
        onError: () => {
          setStatus('error');
          Swal.fire({
            title: 'Error!',
            text: 'Failed to verify your email. Please try again.',
            icon: 'error',
          });
        },
      }
    );
  };

  useEffect(() => {
    const token = searchParams?.get('token');
    if (token) {
      handleVerify(token);
    } else {
      setStatus('error');
    }
  }, [searchParams, verifyEmail]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualToken) {
      setStatus('loading');
      handleVerify(manualToken);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-gray-700">Verifying your email...</p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600">Email Verified Successfully</h1>
          <p className="mt-2 text-gray-700">Your email has been verified. You can now log in.</p>
          <button
            onClick={() => router.push('/auth/login')}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-50 to-blue-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-blue-600 text-center">Email Verification</h1>
        <p className="mt-4 text-gray-600 text-center">
          We couldn&rsquo;t verify your email. Please try again.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="token"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Enter Token:
            </label>
            <input
              id="token"
              type="text"
              value={manualToken}
              onChange={(e) => setManualToken(e.target.value)}
              className="border border-gray-300 text-black rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your token"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Verify Token
          </button>
          <Button
            title="Resend Email"
            colorSchema="green"
            onClick={() => {
              router.push("/resend-email");
            }}
            className="w-full mt-2"
          />
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;