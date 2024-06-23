"use client"

import { CartContextProvider } from "@/hooks/useCart";
import { safeUser } from "@/Types";

interface CartProviderProps {
    children: React.ReactNode;
    currentUser: safeUser | null;
}

const CartProvider: React.FC<CartProviderProps> = ({ children, currentUser }) => {
    return (
        <CartContextProvider currentUser={currentUser}>
            {children}
        </CartContextProvider>
    );
}

export default CartProvider;
