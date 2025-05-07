"use client"
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import useAuthModule from '../auth/lib'
import Link from 'next/link'
import Button from '@/components/Button'
import { signOut } from 'next-auth/react'

const user = () => {
  const {useProfile} = useAuthModule()
  const {data} = useProfile()
  console.log("data", data);
  return (
    <div className='text-black flex flex-col justify-center'>
    <h1 className='text-3xl text-blue-400'>ini halaman User</h1>
      
    {JSON.stringify(data)}
    <div className="">

    <Button
        title="Logout"
        colorSchema="red"
        onClick={() => {
          signOut();
        }}
      />
    </div>
    </div>
    

    
  )
}

export default user