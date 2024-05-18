import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { safeUser } from "@/Types";
import MenuItem from "./MenuItem";
import Avatar from "../Avatar";
import { AiFillCaretDown } from "react-icons/ai";


interface UserMenuProps {
  currentUser: safeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
          onClick={toggleOpen}
          className="p-2 border flex flex-row cursor-pointer text-slate-700 hover:shadow-md transition gap-1 rounded-full items-center"
        >

        <Avatar />
          <AiFillCaretDown />
      </div>
      {isOpen && (
        <div className="rounded-md overflow-hidden w-48 bg-white shadow-md absolute right-0 top-12 text-sm flex flex-col cursor-pointer">
          {currentUser ? (
            <div>
              <Link href="/orders">
              
                  <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                
              </Link>
              <Link href="/admin">
      
                  <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
              
              </Link>
              <hr />
              <MenuItem
                onClick={() => {
                  toggleOpen();
                  signOut();
                }}
              >
                Logout
              </MenuItem>
            </div>
          ) : (
            <div>
              <Link href="/login">
                
                  <MenuItem onClick={toggleOpen}>Login</MenuItem>
              
              </Link>
              <Link href="/register">
              
                  <MenuItem onClick={toggleOpen}>Register</MenuItem>
            
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;





