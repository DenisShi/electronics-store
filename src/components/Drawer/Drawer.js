import "../../index.css";
import styles from "./Drawer.module.css";

import { useState } from "react";
import axios from "axios";

import DrawersCard from "./DrawersCard.js";
import Info from "../Card/Info.jsx";
import { useCart } from "../../hooks/useCart";

function Drawer(props) {
  const { cartItems, setCartItems, totalPrice, totalPriceLocale } = useCart();
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const dph = (totalPrice / 100) * 5;

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://635c48e0fc2595be26440880.mockapi.io/Orders",
        { items: cartItems }
      );

      // only for mockApi //
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://635c48e0fc2595be26440880.mockapi.io/cart/" + item.id
        );
        await delay(100);
      }

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
    } catch (error) {
      alert("Failed to create order");
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={props.onClose} />
      <div className={styles.drawer}>
        <div>
          <div className={styles.headerCart}>
            <h2>Cart</h2>
            <div className="btn rotated" onClick={props.onClose}>
              <ion-icon name="add-circle-outline"></ion-icon>
            </div>
          </div>
          {props.cartItems.length > 0 ? (
            <>
              <div className={styles.itemsCart}>
                {props.cartItems.map((obj) => (
                  <DrawersCard
                    key={obj.id}
                    title={obj.title}
                    price={obj.price}
                    imgName={obj.imgName}
                    id={obj.id}
                    onRemoveItem={props.onRemoveItem}
                  />
                ))}
              </div>
              <div className={styles.cartTotalBlock}>
                <ul>
                  <li>
                    <span>DPH: 5%</span>
                    <div></div>
                    <b>{totalPriceLocale(dph)}</b>
                  </li>
                  <li>
                    <span>To Pay</span>
                    <div></div>
                    <b>{totalPriceLocale(totalPrice + dph)}</b>
                  </li>
                </ul>
                <button disabled={isLoading} onClick={onClickOrder}>
                  Buy it! <span className="arrow arrow-right"></span>
                </button>
              </div>
            </>
          ) : (
            <div>
              <Info
                title={
                  isOrderComplete
                    ? "Order is processed"
                    : "No items in the cart"
                }
                description={
                  isOrderComplete
                    ? `Your order #${orderId} will soon be transferred to courier delivery`
                    : "Please add at least one item to your cart"
                }
                image={require(isOrderComplete
                  ? `../../img//processed-order.png`
                  : `../../img//empty-box.png`)}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Drawer;
