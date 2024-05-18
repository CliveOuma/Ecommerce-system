"use client"
import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { useEffect, useState } from "react";
import { safeUser } from "@/Types"; 

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState<safeUser | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();
      setCurrentUser(user);
    }
    fetchUser();
  }, []);

  return (
    <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-sm">
      <div className="py-4 border-b[1px]">
        <Container>
          <div className="flex items-center justify-between gap-3 md-gap-0">
            <Link href="/">e-buy</Link>
            <div className="hidden md:block">Search</div>
            <div className="flex items-center gap-8 md-gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
