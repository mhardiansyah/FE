/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import * as yup from "yup";

import { LoginPayload } from "../interface";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../lib";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Session } from 'next-auth';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { sign } from "crypto";
import InputText from "@/components/TextInput";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

const Login = () => {
  const { useLogin } = useAuthModule();
  const router = useRouter();
    const {data: session, status} = useSession();

    useEffect(() => {
      if(session?.user.roles === "admin") {
        router.push("/admin");
      }
      if(session?.user.roles === "member") {
        router.push("/member");
      }
      if(session?.user.roles === "user") {
        router.push("/user");
      }
    },[session, status]); 
    
  const { mutate, isPending: isLoading } = useLogin();
  const formik = useFormik<LoginPayload>({
    initialValues: loginSchema.getDefault(),
    validationSchema: loginSchema,
    enableReinitialize: true,
    onSubmit: (payload: LoginPayload) => {
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  if ( status === "loading" || status === "authenticated") {
    return <div className="text-black">Loading...</div>;
  }

  if ( status === "unauthenticated") {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-blue-500">Welcome Back!</h1>
            <p className="text-gray-600 mt-2">Please login to your account</p>
          </div>
          <FormikProvider value={formik}>
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <section>
                <Label htmlFor="email" title="Email Address" />
                <InputText
                  value={values.email}
                  placeholder="example@email.com"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "email")}
                  messageError={getIn(errors, "email")}
                />
              </section>
              <section>
                <Label htmlFor="password" title="Password" />
                <InputText
                  value={values.password}
                  placeholder="********"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isError={getIn(errors, "password")}
                  messageError={getIn(errors, "password")}
                />
              </section>
              <section className="flex justify-between items-center">
                <Link href="/auth/forgot-password" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </Link>
              </section>
              <section>
                <Button
                  height="lg"
                  title="Login"
                  colorSchema="blue"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  className="w-full"
                />
              </section>
              <section className="text-center text-gray-500">Or login with</section>
              <section className="flex space-x-4">
                <Button
                  height="lg"
                  title="Google"
                  type="button"
                  onClick={() => signIn("google")}
                  colorSchema="green"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  className="flex-1"
                />
                <Button
                  height="lg"
                  title="Github"
                  type="button"
                  onClick={() => signIn("github")}
                  colorSchema="red"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  className="flex-1"
                />
              </section>
              <section className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/register" className="text-blue-500 hover:underline">
                    Register here
                  </Link>
                </p>
              </section>
            </Form>
          </FormikProvider>
        </div>
      </section>
    );
  }
};

export default Login;
