import styles from '../components/Content/Content.module.css'

import {useContext} from "react";

import Card from "../components/Card/index.js";
import {AppContext} from '../App.js'



 function Favorites({ searchValue, setSearchValue, onChangeSearchInput, onAddToFavorite}) {
  
  const {cartFavorite} = useContext(AppContext)

  return (
    <div className={styles.content}>
      <div className={styles.headerCard}>
        <h1>
          {searchValue ? `Search: "${searchValue}"` : "FAVORITES"}
        </h1>

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
            <span
              onClick={() => setSearchValue("")}
              className="btn rotated"
            >
              <ion-icon name="add-circle-outline"></ion-icon>
            </span>
          )}
        </div>
      </div>

      <div className={styles.items}>
        {cartFavorite.map((obj, index) => (
          <Card
            key={index}
            {...obj}
            // title={obj.title}
            // price={obj.price}
            // imgName={obj.imgName}
            // onAddToCard={onAddToCard}
            onAddToFavorite={onAddToFavorite}
            // id={obj.id}
          />
        ))}
      </div>
    </div>
  );
 }

 export default Favorites;