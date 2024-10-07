import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth/AuthContext";

const CartPage = () => {
    const [cart, setCart] = useState();
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
                    setCart(data);
                    console.log({ cart });
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
    return (
        <>myCart</>
    )
}

export default CartPage;