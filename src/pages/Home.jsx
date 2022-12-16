import { Route, Routes } from "react-router-dom";
import {useContext} from 'react'

import Header from "../components/Header/Header.js";
import Drawer from "../components/Drawer/Drawer.js";
import Content from "../components/Content/Content.js";
import Favorites from "./Favorites.jsx";
import Orders from './Orders'
import Navbar from '../components/Navbar/Navbar.js'
import OutOfStock from "./OutOfStock.jsx";

// import { AppContext } from "../App.js";

 function Home({cartFavorite, setCartItems,
  onChangeSearchInput,
  searchValue,
  setSearchValue,
  onAddToCart,
  onAddToFavorite,
  isLoading,
  items,
  cartItems,
  setCartOpened,
  onRemoveItem,
  cartOpened
}) {

    // const { items, cartItems, setCartOpened, onRemoveItem, cartOpened } = useContext(AppContext);

   return (
      <div className="App">
        <div className="homePage">
        {cartOpened && <Drawer
            items={items}
            cartItems={cartItems}
            onClose={() => setCartOpened(false)}
            onRemoveItem={onRemoveItem}
            cartOpened={cartOpened}
          />}
        
        <Header cartItems={cartItems} onClickCart={() => setCartOpened(true)} />
   
             <Navbar/>
        <Routes>
          <Route
            path="/"
            element={
              <>
              <div className="photoShop">

<img style={{width: '100%'}}  src={require("../../src/img/shop-photo.jpg")} alt="shop" />
</div>
              <Content
                items={items} //
                cartItems={cartItems} // 
                setCartItems={setCartItems} // 
                onChangeSearchInput={onChangeSearchInput} // 
                searchValue={searchValue} //
                setSearchValue={setSearchValue} //
                onAddToCart={onAddToCart} // 
                onAddToFavorite={onAddToFavorite} //
                loading={false}
                isLoading={isLoading}
              />
</>    
            }
              />
          <Route path='/televisions' element={<Content
                items={items}
                cartItems={cartItems}
                setCartItems={setCartItems}
                onChangeSearchInput={onChangeSearchInput}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                loading={false}
                isLoading={isLoading}
              />} />
          <Route path="/favorites" element={<Favorites onAddToFavorite={onAddToFavorite} cartFavorite={cartFavorite}/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path='/OutOfStock' element={<OutOfStock/>} />
        </Routes>
        </div>
      </div>
   )
 }

 export default Home;