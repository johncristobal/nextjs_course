import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { checkUser, oAuthToUser } from '../../../database/dbUsers';
import { signIn } from 'next-auth/react';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
    Credentials({
        name: 'Custom Login',
        credentials: {
            email: {label: 'Correo', type:'email', placeholder: 'user@dema.com'},
            password: {label: 'Password', type:'password', placeholder: '123456'},
        },
        async authorize(credentials){

            return await checkUser(credentials!.email, credentials!.password);
        }
    })
  ],

  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },

  jwt: {
    //secret: process.env.
  },

  session: {
    maxAge: 2592000,
    strategy: 'jwt',
    updateAge: 86400
  },

  callbacks: {
    async jwt({ token , account, user }) {
        if (account) {
            token.accessToken = account.access_token;

            switch (account.type) {
                case 'credentials':
                    token.user = user;
                    break;
                case 'oauth':
                    token.user = await oAuthToUser( user.email || '', user.name || '');
                    break;
                default:
                    break;
            }
        }
        return token;
    },
     
    async session({ session, token, user }){

        session.accessToken = token.accessToken;
        session.user = token.user;
        return session;
    }
  }
}

export default NextAuth(authOptions);