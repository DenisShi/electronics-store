import styles from "./Navbar.module.css";

import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpenProducts, setIsOpenProducts] = useState(false);

  const handleClick = () => {
    setIsOpenProducts(!isOpenProducts);
  };

  return (
    <>
      <div className={styles.navbar}>
        <ul>
          <Link to="/">
            <li>
              <span className={styles.itemNavbar}>
                <ion-icon name="home-outline"></ion-icon>
              </span>
              Home
            </li>
          </Link>
          <li onClick={handleClick}>
            Products
            <ul className={isOpenProducts ? styles.navProducts : ""}>
              <Link to="/televisions">
                <li>
                  <span className={styles.itemNavbar}>
                    <ion-icon name="tv-outline"></ion-icon>
                  </span>
                  Televisions
                </li>
              </Link>
              <Link to="/OutOfStock">
                <li>
                  <span className={styles.itemNavbar}>
                    <ion-icon name="phone-portrait-outline"></ion-icon>
                  </span>
                  Mobile Phones
                </li>
              </Link>
              <Link to="/OutOfStock">
                <li>
                  <span className={styles.itemNavbar}>
                    <ion-icon name="camera-outline"></ion-icon>
                  </span>
                  Digital Cameras
                </li>
              </Link>
            </ul>
          </li>
          <Link to="/favorites">
            <li>
              <span className={styles.itemNavbar}>
                <ion-icon name="star-outline"></ion-icon>
              </span>
              Favorites
            </li>
          </Link>
          <Link to="/orders">
            <li>
              <span className={styles.itemNavbar}>
                <ion-icon name="pricetags-outline"></ion-icon>
              </span>
              Orders
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
