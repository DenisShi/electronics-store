import "../../index.css";
import styles from "./Content.module.css";

import { useContext } from "react";

import Card from "../Card";
import { AppContext } from "../../App.js";

function Content({
  isLoading,
  // items,
  // onChangeSearchInput,
  // searchValue,
  // setSearchValue,
  onAddToCard,
}) {
  const {
    items,
    onChangeSearchInput,
    searchValue,
    setSearchValue,
    onAddToFavorite,
    // onAddToCard,
  } = useContext(AppContext);

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
    return (isLoading ? [...Array(8)] : filteredItems).map((obj, index) => (
      <Card
        {...obj}
        key={index}
        // onAddToCard={onAddToCard} //
        onAddToCard={(obj) => onAddToCard(obj)} //
        favorited={true} //
        isLoading={isLoading} //
        onAddToFavorite={(obj) => onAddToFavorite(obj)} //
      />
    ));
  };

  return (
    <div className={styles.content}>
      <div className={styles.headerCard}>
        <h1>{searchValue ? `Search: "${searchValue}"` : "TELEVISIONS"}</h1>

        <div className={styles.searchBlock}>
          <span>
            <ion-icon name="search-circle-outline"></ion-icon>
          </span>

          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Search..."
          />
          {searchValue && (
            <span onClick={() => setSearchValue("")} className="btn rotated">
              <ion-icon name="add-circle-outline"></ion-icon>
            </span>
          )}
        </div>
      </div>

      <div className={styles.items}>{renderItems()}</div>
    </div>
  );
}

export default Content;
