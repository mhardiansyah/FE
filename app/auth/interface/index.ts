/* eslint-disable @typescript-eslint/no-empty-object-type */
import { BaseResponseSuccess } from "@/lib/axiosClient";
interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse extends BaseResponseSuccess {}

export interface RegisterPayload
  extends Pick<User, "name" | "email" | "password"> {}

//login
interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
  refresh_token: string;
  access_token: string;
  verification_token: string;
}

// Tambahkan di index.ts
export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  is_email_verified: boolean;
  verification_token_expiry: string;
}

// Jika ada response wrapper seperti:
export interface AdminListResponse {
  status: string;
  message: string;
  data: {
    success: boolean;
    message: string;
    Admins: Admin[];
  };
}

export interface socialPayload {
  name: string;
  email: string;
  avatar: string;
}

export interface LoginPayload extends Pick<User, "email" | "password"> {}
export interface rolepayload
  extends Pick<User, "role" | "email" | "password" | "id" | "name"> {}

export interface RegisterPayload
  extends Pick<User, "name" | "email" | "password"> {}


export interface VerifiyPayload extends Pick<User, "verification_token"> {}
export interface VerifyResponse extends BaseResponseSuccess {
  data: User;
}

export interface RegisterResponse extends BaseResponseSuccess {
  data: User;

}

export interface LoginResponse extends BaseResponseSuccess {
  data: User;
}

export interface AdminResponse extends User {
  data: User[];
}
export interface MemberResponse extends User {
  data: User[];
}

export interface ProfileResponse extends BaseResponseSuccess {
  data: User;
}
