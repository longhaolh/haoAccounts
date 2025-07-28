import type { FC } from 'react'
import styles from './style.module.scss'
const Skeleton: FC = () => {
    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col} style={{ height: "12vh" }}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.col} style={{ height: "10vh" }}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.col} style={{ height: "20vh" }}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.col} style={{ height: "25vh" }}></div>
        </div>
        <div className={styles.row}>
          <div className={styles.col} style={{ height: "20vh" }}></div>
        </div>
      </div>
    );
}
export default Skeleton;
