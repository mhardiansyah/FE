/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useAuthModule from '@/app/auth/lib';
import Swal from 'sweetalert2';

const VerifyEmailPage = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [manualToken, setManualToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { useVerify } = useAuthModule();
  const { mutate: verifyEmail } = useVerify();

  const handleVerify = (token: string) => {
    verifyEmail(
      { token },
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
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-red-600 text-center">Verification Failed</h1>
        <p className="mt-2 text-gray-700 text-center">
          We couldn&rsquo;t verify your email. Please try again.
        </p>
        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="token" className="block mb-2 text-sm font-medium text-gray-700">
            Enter Token:
          </label>
          <input
            id="token"
            type="text"
            value={manualToken}
            onChange={(e) => setManualToken(e.target.value)}
            className="border border-gray-300 text-black rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter your token"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Verify Token
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailPage;