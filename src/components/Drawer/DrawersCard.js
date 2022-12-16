import "../../index.css";
import styles from "./Drawer.module.css";

function DrawersCard({ title, price, imgName, onRemoveItem, id }) {
  const filePath = require(`../../img//${imgName.toLowerCase()}.jpg`); // the module request

  const priceToLocale = price.toLocaleString("eu-EU", {
    style: "currency",
    currency: "eur",
  });
  return (
    <>
      <div className={styles.cartItem}>
        <img width={70} src={filePath} alt="tv-1" />
        <div className={styles.cartInfo}>
          <p>{title}</p>
          <b>{priceToLocale}</b>
        </div>
        <div className={styles.drawerBtn}>
          <span className="btn rotated" onClick={() => onRemoveItem(id)}>
            <ion-icon name="add-circle-outline"></ion-icon>
          </span>
        </div>
      </div>
    </>
  );
}

export default DrawersCard;
