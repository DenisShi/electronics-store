import styles from "./Card.module.css";
import '../../index.css'

import { useContext } from 'react'

import  {AppContext}  from '../../App';

const Info = ({title, image, description}) => {
   const {setCartOpened} = useContext(AppContext)

     return (
    <div className={styles.DrawerInfo}>
      <div className={styles.cartTest}>
      <img className="" src={image} alt="image Info" />
      <div className={styles.text}>
      <h2>{title}</h2>
      <p>{description}</p>
      </div>
      <button className={styles.buttonInfo} onClick={() => setCartOpened(false)}>
        <span className="arrow arrow-left"></span>Back</button>
    </div>
    </div>
  )
}

export default Info;