import styles from '../components/Content/Content.module.css'

import {useContext, useEffect, useState} from "react";
import axios from "axios";

import Card from "../components/Card/index.js";
import {AppContext} from '../App.js'

 function Orders() {
  const [orders, setOrders] = useState([])
  const { onAddToCard } = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   (async () => {
      
      try {
         const {data} = await axios.get('https://635c48e0fc2595be26440880.mockapi.io/Orders')
      setOrders(data.reduce((acc, obj) => [...acc, ...obj.items], []))
      
      } catch (error) {
         alert('Failed loading')
         console.error(error)
      }
         setIsLoading(!isLoading)
   })()    

}, [])
   

  return (
    <div className={styles.content}>
      <div className={styles.headerCard}>
        <h1>
          MY ORDERS
        </h1>

      </div>

      <div className={styles.items}>
        {(isLoading ? [...Array(10)] : orders).map((obj, index) => (
          <Card
            {...obj}
            key={index}
            // title={obj.title}
            // price={obj.price}
            // imgName={obj.imgName}
            onAddToCard={onAddToCard}
            favorited={true}
            // id={obj.id}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
 }

 export default Orders;