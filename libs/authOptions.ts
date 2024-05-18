import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/libs/prismadb';
import bcrypt from 'bcryptjs';


const nextAuthSecret = process.env.NEXTAUTH_SECRET;

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Invalid email or password');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Invalid email or password');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Invalid email or password');
        }

        return { ...user, email: credentials.email };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: nextAuthSecret,
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt' as const,
  },
  debug: process.env.NODE_ENV === 'development',
};
