import styles from "./Header.module.css";

import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

function Header({ onClickCart }) {
  const { cartItems, totalPrice, totalPriceLocale } = useCart();

  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.headerLeft}>
          <img
            width={"200px"}
            src={require("../../img/smartLogo.png")}
            alt="tv-1"
          />
        </div>
      </Link>
      <ul className={styles.headerRight}>
        <li className={styles.iconCart} onClick={onClickCart}>
          <span>({cartItems.length}) </span>

          <span>
            <ion-icon name="cart-outline"></ion-icon>
          </span>
          <span className={styles.price}>{totalPriceLocale(totalPrice)}</span>
        </li>
        <li className={styles.headerLogo}>
          <Link to="/favorites">
            <ion-icon name="heart-circle-outline"></ion-icon>
          </Link>
        </li>
        <li className={styles.headerLogo}>
          <Link to="/orders">
            <ion-icon name="person-circle-outline"></ion-icon>
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
