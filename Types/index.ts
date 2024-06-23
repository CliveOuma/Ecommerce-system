import { User } from "@prisma/client";

export type safeUser = Omit<User, "createdAt" | "updatedAt" | "emailVerified"> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  role: 'USER' | 'ADMIN';
};
