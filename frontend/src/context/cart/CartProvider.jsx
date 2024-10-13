import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "../Auth/AuthContext";

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { token } = useAuth();
    const fetchCart = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            if (response.ok) {
                const data = await response.json();
                const cartItemsMapped = data.products.map((product) => {
                    return {
                        id: product.productId,
                        title: product.title,
                        price: product.price,
                        quantity: product.quantity,
                        image: product.image
                    }
                });
                setCartItems(cartItemsMapped);
                setTotalPrice(data.totalPrice);
            }
            else {
                throw new Error(`Failed to fetch cart:${response.status}`);
            }
        }
        catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        if (!token) {
            return;
        }

        fetchCart();
    }, []);

    const addItemToCart = async ({ id, price }) => {
        if (!token) {
            throw new Error("User not authenticated");
        }
        var cart;
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                }
            );
            if (response.ok) {
                cart = await response.json();
            }
            else {
                throw new Error(`Failed to fetch cart:${response.status}`);
            }
        }
        catch (err) {
            console.error(err);
        }
        const itemIndex = cart.products.findIndex(item => item.productId === id);
        if (itemIndex >= 0) {
            console.log("Item already exists in cart");
            //ToDo: handle updating item in cart
            return;
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/items`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId: id, quantity: 1, price }),
                }
            );
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(`Error adding item to cart: ${errorMessage.message}`);
            }
            await fetchCart();
        }
        catch (error) {
            console.log(error);
        }
    }

    const updateItemInCart = async (productId, quantity) => {
        if (!token) {
            throw new Error("User not authenticated");
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/items/`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productId, quantity }),
                }
            );
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(`Error updating item in cart: ${errorMessage.message}`);
            }
            const data = await response.json();
            const cartItemsMapped = data.products.map((product) => {
                return {
                    id: product.productId,
                    title: product.title,
                    price: product.price,
                    quantity: product.quantity,
                    image: product.image
                }
            });
            setCartItems(cartItemsMapped);
            setTotalPrice(data.totalPrice);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    const removeItemFromCart = async (productId) => {
        if (!token) {
            throw new Error("User not authenticated");
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart/items/${productId}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(`Error removing item from cart: ${errorMessage.message}`);
            }
            const data = await response.json();
            const cartItemsMapped = data.products.map((product) => {
                return {
                    id: product.productId,
                    title: product.title,
                    price: product.price,
                    quantity: product.quantity,
                    image: product.image
                }
            });
            setCartItems(cartItemsMapped);
            setTotalPrice(data.totalPrice);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    const clearCart = async () => {
        if (!token) {
            throw new Error("User not authenticated");
        }
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            if (!response.ok) {
                const errorMessage = await response.json();
                throw new Error(`Error clearing cart: ${errorMessage.message}`);
            }
            setCartItems([]);
            setTotalPrice(0);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, totalPrice, addItemToCart, updateItemInCart, removeItemFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;