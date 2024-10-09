import { createContext, useContext } from "react";

export const CartContext = createContext({
  cartItems: [
    {
      id: null,
      title: null,
      price: null,
      quantity: null,
      image: null,
    },
  ],
  totalPrice: null,
  addItemToCart: () => {},
});

export const useCart = () => useContext(CartContext);
