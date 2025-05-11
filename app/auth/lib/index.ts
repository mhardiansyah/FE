/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { axiosClient } from "@/lib/axiosClient";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  AdminResponse,
  LoginPayload,
  LoginResponse,
  MemberResponse,
  ProfileResponse,
  RegisterPayload,
  RegisterResponse,
  socialPayload,
  VerifiyPayload,
} from "../interface";
import Swal from "sweetalert2";
import { Sign } from "crypto";
import { Session } from "inspector/promises";
import useAxiosAuth from "@/Hook/useAuthAxios";
import { VerifyResponse } from "./../interface/index";

export const socialLogin = async (
  payload: socialPayload
): Promise<LoginResponse> => {
  return axiosClient
    .post("/auth/social-login", payload)
    .then((res) => res.data);
};

const useAuthModule = () => {
  const router = useRouter();
  const axiosAuthClient = useAxiosAuth();
  const { data: session } = useSession();
  const register = async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    return axiosClient.post("/auth/register", payload).then((res) => res.data);
  };

  const useRegister = () => {
    const { mutate, isPending: isLoading } = useMutation({
      mutationFn: async (payload: RegisterPayload) => register(payload),
      onSuccess: (response: RegisterResponse) => {
      Swal.fire({
        title: "Registration Successful!",
        text: `Your verification token is: ${response.data.verification_token}`,
        icon: "success",
      }).then(() => {
        router.push(`/auth/verify`);
      });
    },
      onError: (error: any) => {
        console.log("error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.message || "An error occurred!",
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      },
    });
    return { mutate, isPending: isLoading };
  };
  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    return axiosClient.post("/auth/login", payload).then((res) => res.data);
  };

  const useLogin = () => {
    const { mutate, isPending: isLoading } = useMutation(
      // (payload: LoginPayload) => login(payload),
      {
        mutationFn: async (payload: LoginPayload) => login(payload),
        onSuccess: async (response: any) => {
          try {
            // Tampilkan notifikasi sukses
            Swal.fire({
              title: "Good job!",
              text: response.message,
              icon: "success",
            });

            console.log("Response from backend:", response);

            // Pastikan data dari backend digunakan untuk signIn
            const { id, name, email, access_token, refresh_token, roles } =
              response.data;

            await signIn("credentials", {
              id,
              name,
              email,
              accessToken: access_token, // Gunakan data dari backend
              refreshToken: refresh_token, // Gunakan data dari backend
              roles, // Gunakan data dari backend
              redirect: false,
            });

            localStorage.setItem("access_token", access_token);

            // Jika perlu, arahkan pengguna ke halaman tertentu
            // router.push("/dashboard"); // Sesuaikan dengan kebutuhan Anda
          } catch (error) {
            console.error("Error during signIn:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "An error occurred during login!",
            });
          }
        },
        onError: (error: any) => {
          console.log("error:", error.message);
          if (error.response.status == 422) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: error.response.data.message,
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "An error occurred!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          }
        },
      }
    );
    return { mutate, isPending: isLoading };
  };
  const getProfile = async (): Promise<ProfileResponse> => {
    return axiosClient.get("/auth/profile").then((res) => res.data);
  };

  const verify = async (payload: VerifiyPayload): Promise<VerifyResponse> => {
    return await axiosClient
      .get(`/auth/verify-email?token=${payload.verification_token}`) // Kirim token sebagai query parameter
      .then((res) => res.data);
  };

  const useVerify = () => {
    const mutate = useMutation({
      mutationFn: (payload: VerifiyPayload) => verify(payload),
      onSuccess: (data) => {
        console.log("Verify successful", data);
      },
    });
    return mutate;
  };
  const resendVerification = async (
    email: string
  ): Promise<VerifyResponse> => {
    return await axiosClient
      .post(`/auth/resend-verification`, { email }) // Kirim email sebagai body parameter
      .then((res) => res.data);
  };

  const useResendVerification = () => {
    const mutate = useMutation({
      mutationFn: (email: string) => resendVerification(email),
      onSuccess: (data) => {
        console.log("Resend verification successful", data);
        Swal.fire({
          title: "Success!",
          text:  `Your verification token is: ${data.data.verification_token}`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          router.push("/auth/verify");
        })
      },
      onError: (error: any) => {
        console.error("Error during resend verification:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response?.data?.message || "An error occurred!",
        });
      },
    });
    return mutate;
  };

  const getProfileAdmin = async (): Promise<AdminResponse> => {
    return axiosClient.get("/auth/profile-Admin").then((res) => res.data.data);
  };

  const useProfileAdmin = () => {
    const { data, isLoading, isFetching } = useQuery({
      queryKey: ["/auth/profile-Admin"],
      queryFn: () => getProfileAdmin(),
      select: (Response) => Response,
      staleTime: 1000 * 60 * 60,
      refetchInterval: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      // enabled : session?.user?.id !== undefined,
    });
    return { data, isLoading, isFetching };
  };

  const getProfileMember = async (): Promise<MemberResponse> => {
    return axiosClient
      .get("/auth/profile/list/member")
      .then((res) => res.data.data);
  };

  const useProfileMember = () => {
    const { data, isLoading, isFetching } = useQuery({
      queryKey: ["/auth/profile/list/member"],
      queryFn: () => getProfileMember(),
      select: (Response) => Response.data,
      staleTime: 1000 * 60 * 60,
      refetchInterval: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      // enabled : session?.user?.id !== undefined,
    });
    return { data, isLoading, isFetching };
  };

  const useProfile = () => {
    const { data, isLoading, isFetching } = useQuery({
      queryKey: ["/auth/profile"],
      queryFn: () => getProfile(),
      select: (Response) => Response,
      staleTime: 1000 * 60 * 60,
      refetchInterval: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      enabled: session?.user?.id !== undefined,
    });
    return { data, isLoading, isFetching };
  };

  return {
    useRegister,
    useLogin,
    useProfile,
    useProfileAdmin,
    useVerify,
    useProfileMember,
    useResendVerification,
  };
};

export default useAuthModule;
