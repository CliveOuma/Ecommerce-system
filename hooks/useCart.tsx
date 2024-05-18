import React, { createContext, useState, useContext, useCallback,useEffect } from "react";
import {CartProductType} from '@/app/product/[productId]/ProductDetails';
import {toast} from 'react-hot-toast';
import { red } from "@mui/material/colors";


type CartContextType = {
    cartTotalQty: number,
    cartTotalAmount: number,
    cartProducts: CartProductType[] | null;
    handleAddProductsToCart: (product: CartProductType) => void
    handleRemoveProductFromCart: (product: CartProductType) => void
    handleCartQtyIncrease: (product: CartProductType) => void
    handleCartQtyDecrease: (product: CartProductType) => void
    handleClearCart: () => void
}

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
    [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
    const [cartTotalQty, setCartTotalQty] = useState(0);
    const [cartTotalAmount, setCartTotalAmount] = useState(0)
    const [cartProducts, setCartProduct] = useState<CartProductType[] | null>(null)

    //store cartItems in the localStorage after refreshing
    useEffect(() => {
         const cartItems: any = localStorage.getItem('cartItems')
         const TheCartProducts: CartProductType[] | null = JSON.parse(cartItems)

         setCartProduct(TheCartProducts)
    },[])

    useEffect(() => {
        const  getTotals = () => {

            if(cartProducts) {
                const {total, qty}    = cartProducts?.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity
    
                    acc.total += itemTotal
                    acc.qty += item.quantity
    
                    return acc;
                }, {
                    total: 0,
                    qty: 0
            })
            setCartTotalQty(qty)
            setCartTotalAmount(total)

            }

        }
        getTotals()
    },[cartProducts])



    const handleAddProductsToCart = useCallback((product: CartProductType) => {
        setCartProduct((prev) => {
            let updateCart;
    
            if (prev) {
                // Check if the product is already in the cart
                const existingProductIndex = prev.findIndex((item) => item.id === product.id);
    
                if (existingProductIndex !== -1) {
                    // If the product is already in the cart, update the quantity
                    const updatedCart = [...prev];
                    updatedCart[existingProductIndex].quantity += product.quantity;
                    updateCart = updatedCart;
                } else {
                    // If the product is not in the cart, add it
                    updateCart = [...prev, product];
                }
            } else {
                updateCart = [product];
            }
    
            toast.success('Product added successfully');
    
            // Store cartItems in the localStorage after refreshing
            localStorage.setItem('cartItems', JSON.stringify(updateCart));
            return updateCart;
        });
    }, [cartProducts]);

    //To remove products from cart based on Id
    const handleRemoveProductFromCart = useCallback((product: CartProductType) => {
        if (cartProducts) {
            const updatedCart = cartProducts.filter((item) => item.id !== product.id);
            setCartProduct(updatedCart);
            toast.success('Product removed successfully');
            
            // Update localStorage
            localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        }
    }, [cartProducts]);


    const handleCartQtyIncrease = useCallback((product: CartProductType) => {

        let updatedCart;

        if (product.quantity === 99){
            return toast.error("Ooops! Maximum quantity reached");
        }
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

            if(existingIndex > -1){
                updatedCart[existingIndex].quantity =
                ++updatedCart[existingIndex].quantity
            }
            setCartProduct(updatedCart)
            localStorage.setItem('cartItems',JSON.stringify(updatedCart))

        }

    },[cartProducts])


    const handleCartQtyDecrease = useCallback((product: CartProductType) => {

        let updatedCart;

        if (product.quantity === 1 ){
            return toast.error("Ooops! Minimum quantity reached");
        }
        if(cartProducts){
            updatedCart = [...cartProducts]

            const existingIndex = cartProducts.findIndex((item) => item.id === product.id);

            if(existingIndex > -1){
                updatedCart[existingIndex].quantity =
                --updatedCart[existingIndex].quantity
            }
            setCartProduct(updatedCart)
            localStorage.setItem('cartItems',JSON.stringify(updatedCart))

        }

    },[cartProducts])

    const handleClearCart = useCallback(() => {
        setCartProduct(null)
        setCartTotalQty(0)
        localStorage.setItem('cartItems', JSON.stringify(null));

    },[cartProducts])


    const value = {
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductsToCart,
        handleRemoveProductFromCart,
        handleCartQtyIncrease,
        handleCartQtyDecrease,
        handleClearCart
    };

    return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => { 
    const context = useContext(CartContext);

    if (context === null) {
        throw new Error("useCart must be used within a CartContextProvider")
    }

    return context;
};
