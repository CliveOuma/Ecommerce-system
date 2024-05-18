import { authOptions } from '@/libs/authOptions';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth/next';

// Define the default function that exports the NextAuth handler
export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
