import styles from "./Card.module.css";
import { useState, useContext } from "react";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../App.js";
import { useCart } from "../../hooks/useCart";

// {
//   id,
//   onAddToFavorite,
//   onAddToCard,
//   imgName,
//   title,
//   price,
//   favorited,
//   isLoading,
// }

function Card({
  id,
  title,
  imgName,
  price,
  onAddToFavorite,
  onAddToCard,
  favorited = false,
  isLoading = false,
}) {
  const { totalPriceLocale } = useCart();
  const { isItemAdded } = useContext(AppContext);
  // const [isAdd, setIsAdd] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  // console.log("id: ", id);
  // console.log(title, isItemAdded(id));
  const objItem = { title, imgName, price, id, parentId: id };

  console.log(objItem);

  const handleClickPlus = () => {
    onAddToCard(objItem);
    // setIsAdd(!isAdd);
    // console.log("handleClickPlus ", onAddToCard);
  };
  const handleClickFavorite = () => {
    onAddToFavorite(objItem);
    setIsFavorite(!isFavorite);
  };

  const filePath =
    isLoading || require(`../../img//${imgName.toLowerCase()}.jpg`); // the module request

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        {isLoading ? (
          <ContentLoader
            speed={2}
            width={192}
            height={300}
            viewBox="0 0 192 328"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            // {...props}
          >
            <rect x="4" y="195" rx="10" ry="10" width="141" height="15" />
            <circle cx="569" cy="886" r="53" />
            <rect x="4" y="215" rx="10" ry="10" width="141" height="15" />
            <rect x="4" y="270" rx="10" ry="10" width="47" height="15" />
            <rect x="0" y="349" rx="10" ry="10" width="112" height="23" />
            <rect x="170" y="328" rx="10" ry="10" width="30" height="23" />
            <rect x="4" y="50" rx="10" ry="10" width="141" height="97" />
            <rect x="116" y="270" rx="10" ry="10" width="28" height="23" />
            <rect x="4" y="290" rx="10" ry="10" width="93" height="15" />
            <rect x="116" y="10" rx="10" ry="10" width="28" height="23" />
          </ContentLoader>
        ) : (
          <>
            <div className={styles.favBtn}>
              <button onClick={handleClickFavorite}>
                <span
                  className={isFavorite ? styles.favBtn : styles.checkedLike}
                  style={{ fontSize: "21px" }}
                >
                  <ion-icon name="heart-circle-outline"></ion-icon>
                </span>
              </button>
            </div>
            <div>
              <img width={"130px"} src={filePath} alt={imgName} />
            </div>

            <h5>{title}</h5>
            <div className={styles.cardBottom}>
              <div>
                <b>{isLoading || totalPriceLocale(price)}</b>
              </div>
              <div onClick={handleClickPlus} className={styles.buttonPlusBlock}>
                <div className={styles.buttonPlus}>
                  <h4>Add to Cart</h4>
                </div>

                <button onClick={handleClickPlus}>
                  <span
                    className={
                      isItemAdded(id) ? styles.checkedAdd : styles.cardBottom
                    }
                    style={{ fontSize: "25px" }}
                  >
                    <ion-icon
                      name={
                        isItemAdded(id)
                          ? "checkmark-circle-outline"
                          : "add-circle-outline"
                      }
                    ></ion-icon>
                  </span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;
