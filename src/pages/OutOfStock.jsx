import styles from '../components/Content/Content.module.css'

 function OutOfStock() {
  
  return (
    <div className={styles.content}>
      <div className="outOfStock">
        <h2>We currently do not have this item for sale :(</h2>
        <img width='150px' src={require("../../src/img/out-of-stock.png")} alt="out-of-stock" />
      </div>
    </div>
  );
 }

 export default OutOfStock;