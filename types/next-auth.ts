/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Session } from "next-auth";
 
declare module "next-auth" {
  interface Session {
    user: {
      id: string | undefined | null;
      email: string | undefined | null;
      name: string | undefined | null;
      accessToken: any;
      refreshToken: any;
      token : any
      image: string | undefined | null;
      roles: any;
 
     
    };
 
    
  }
}