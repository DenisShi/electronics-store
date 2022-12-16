import { AppContext } from "../App";
import { useContext } from "react";

export const useCart = () => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const totalPrice = cartItems.reduce((acc, obj) => obj.price + acc, 0);
  const totalPriceLocale = (item) =>
    item.toLocaleString("eu-EU", {
      style: "currency",
      currency: "eur",
    });

  return { cartItems, setCartItems, totalPrice, totalPriceLocale };
};
