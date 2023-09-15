import bcrypt from 'bcrypt';
import NextAuth,{AuthOptions} from 'next-auth';

import GithubProvider from "next-auth/providers/github";

import { PrismaAdapter } from '@next-auth/prisma-adapter';


import prisma from "../../../libs/prismadb";


export const authOptions: AuthOptions={

    adapter:PrismaAdapter(prisma),

    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        })
    ],

    debug:process.env.NODE_ENV=='development',
    session:{
        strategy:"jwt",
    },
    secret:process.env.NEXTAUTH_SECRET

}

const handler=NextAuth(authOptions);

export {handler as GET, handler as POST};