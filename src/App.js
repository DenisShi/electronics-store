import { useEffect, useState, createContext } from "react";
import axios from "axios";

import Home from "./pages/Home.jsx";

export const AppContext = createContext({});

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartFavorite, setCartFavorite] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, cartFavoriteResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://635c48e0fc2595be26440880.mockapi.io/cart"),
            axios.get(
              "https://635c48e0fc2595be26440880.mockapi.io/cartFavorite"
            ),
            axios.get("https://635c48e0fc2595be26440880.mockapi.io/Items"),
          ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setCartFavorite(cartFavoriteResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Data loading error");
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (items) => Number(items.parentId) === Number(obj.id)
      );

      if (findItem) {
        setCartItems((prev) =>
          prev.filter((items) => Number(items.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://635c48e0fc2595be26440880.mockapi.io/cart/${findItem.id}`
        );
      } else {
        const { data } = await axios.post(
          "https://635c48e0fc2595be26440880.mockapi.io/cart",
          obj
        );
        setCartItems((prev) => [...prev, data]);
      }
    } catch (error) {
      alert("add to cart error");
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (cartFavorite.find((favObj) => Number(favObj.id) === Number(obj.id))) {
        axios.delete(
          `https://635c48e0fc2595be26440880.mockapi.io/cartFavorite/${obj.id}`
        );
        setCartFavorite((prev) =>
          prev.filter((items) => Number(items.id) !== Number(obj.id))
        );
      } else {
        await axios.post(
          "https://635c48e0fc2595be26440880.mockapi.io/cartFavorite",
          obj
        );
        setCartFavorite((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Add to favorite error");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://635c48e0fc2595be26440880.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((items) => Number(items.id) !== Number(id))
      );
    } catch (error) {
      alert("Unable to remove items from cart");
      console.error(error);
    }
  };

  const isItemAdded = (id) => {
    const someCartItems = cartItems.some(
      (items) => Number(items.parentId) === Number(id)
    );
    return someCartItems;
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        cartFavorite,
        isItemAdded,
        cartOpened,
        setCartOpened,
        setCartItems,
        onAddToCart,
        onAddToFavorite,

        onChangeSearchInput,
        searchValue,
        onRemoveItem,
        isLoading,
        setSearchValue,
      }}
    >
      <>
        <Home
          items={items}
          cartItems={cartItems}
          setCartItems={setCartItems}
          onChangeSearchInput={onChangeSearchInput}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onAddToCart={onAddToCart}
          onAddToFavorite={onAddToFavorite}
          onRemoveItem={onRemoveItem}
          cartOpened={cartOpened}
          setCartOpened={setCartOpened}
          cartFavorite={cartFavorite}
          isLoading={isLoading}
        />
      </>
    </AppContext.Provider>
  );
}

export default App;
