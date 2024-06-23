import React from "react";
import Link from "next/link";
import Container from "../Container";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import SearchBar from "../SearchBar";
import ToggleMenu from "./ToggleMenu";
import { safeUser } from "@/Types";
import Categories from "./Categories";
import Banner from "./Banner";

const Navbar = async () => {
  const currentUser: safeUser | null = await getCurrentUser();

  return (
    <div>
      <Banner />
      <div className="py-3 border-b border-gray-200" >
        <Container>
          <div className="flex items-center justify-between gap-3 md:gap-0">
            <Link href="/">e-buy</Link>
            <SearchBar />
            <div className="flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
              <ToggleMenu />
            </div>
          </div>
        </Container>
      </div>
      <div className="hidden md:block">
        <Categories /> {/* Only show on larger devices */}
      </div>
    </div>
  );
};

export default Navbar;
