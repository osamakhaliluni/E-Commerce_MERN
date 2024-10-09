import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "../Auth/AuthContext";

// eslint-disable-next-line react/prop-types
const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { token } = useAuth();
    useEffect(() => {
        if (!token) {
            return;
        }
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
                    setTotalPrice(data.cart.totalPrice);
                }
                else {
                    throw new Error(`Failed to fetch cart:${response.status}`);
                }
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchCart();
    }, []);

    const addItemToCart = async ({ id, title, price, image }) => {
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
            const data = await response.json();
            const cartItemsMapped = data.products.map((product) => {
                return {
                    id: product.productId,
                    title: title,
                    price: product.price,
                    quantity: product.quantity,
                    image: image
                }
            });
            setCartItems(cartItemsMapped);
            setTotalPrice(data.totalPrice);
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <CartContext.Provider value={{ cartItems, totalPrice, addItemToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;