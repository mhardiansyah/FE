/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
 
import { useFormik, Form, FormikProvider, getIn } from "formik";
import Link from "next/link";
import * as yup from "yup";
import { RegisterPayload } from "../interface";
import Label from "@/components/Label";
import Button from "@/components/Button";
import useAuthModule from "../lib/index";
import InputText from "@/components/TextInput";
 
export const registerSchema = yup.object().shape({
  name: yup.string().nullable().default("").required("Wajib isi"),
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
 
const Register = () => {
  const { useRegister } = useAuthModule();
  const { mutate,  isPending: isloading} = useRegister();
  const formik = useFormik<RegisterPayload>({
    initialValues: registerSchema.getDefault(),
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;
 
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-blue-500">Create an Account</h1>
          <p className="text-gray-600 mt-2">Join us and start your journey today!</p>
        </div>
        <FormikProvider value={formik}>
          <Form className="space-y-6" onSubmit={handleSubmit}>
            <section>
              <Label htmlFor="name" title="Full Name" />
              <InputText
                value={values.name}
                placeholder="Your full name"
                id="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                isError={getIn(errors, "name")}
                messageError={getIn(errors, "name")}
              />
            </section>
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
            <section>
              <Button
                height="lg"
                title="Register"
                colorSchema="blue"
                isLoading={isloading}
                isDisabled={isloading}
                className="w-full"
              />
            </section>
            <section className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-blue-500 hover:underline">
                  Login here
                </Link>
              </p>
            </section>
          </Form>
        </FormikProvider>
      </div>
    </section>
  );
};
 
export default Register;