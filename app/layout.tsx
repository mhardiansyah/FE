/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ReactQuery from "@/components/ReactQuery";
import { Session } from "next-auth";
import NextAuthProvider from "@/components/NextAuthProvider";



export default function RootLayout({
  children,
  session,
  
}: Readonly<{
  children: React.ReactNode;
  session: Session | null | undefined;  
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ReactQuery>
          {""}
          <NextAuthProvider session={session}>
          {children}
          </NextAuthProvider>
        </ReactQuery>
      </body>
    </html>
  );
}
