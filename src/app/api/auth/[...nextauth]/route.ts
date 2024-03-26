import NextAuth from "next-auth/next";
import userLogin from "@/libs/userLogIn";
import CredentialsProvider from 'next-auth/providers/credentials'

import { authOptions } from "@/libs/auth";


const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}