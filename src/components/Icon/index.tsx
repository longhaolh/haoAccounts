import { type FC } from 'react';
import styles from "./style.module.scss";
import "@/assets/iconfont/iconfont.js";
// @ts-expect-error 忽略类型检查错误
const Icon: FC = ({type,size=16,color='#f40'}) => {
    return (
      <main className={styles.container}>
        {type === "购物" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-shopping"></use>
          </svg>
        )}
        {type === "餐饮" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-dish"></use>
          </svg>
        )}
        {type === "旅游" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-travel"></use>
          </svg>
        )}
        {type === "转账" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-funds"></use>
          </svg>
        )}
        {type === "停车费" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-parking"></use>
          </svg>
        )}
        {type === "交通" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-jiaotong"></use>
          </svg>
        )}
        {type === "加油充电" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-oil"></use>
          </svg>
        )}
        {type === "通讯" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon--tongxun"></use>
          </svg>
        )}
        {type === "还款" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-huankuan"></use>
          </svg>
        )}
        {type === "娱乐" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-yule"></use>
          </svg>
        )}
        {type === "红包" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-hongbao"></use>
          </svg>
        )}
        {type === "外卖" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-waimai"></use>
          </svg>
        )}
        {type === "教育" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon--jiaoyu"></use>
          </svg>
        )}
        {type === "酒店住宿" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-hotel"></use>
          </svg>
        )}
        {type === "住房租金" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-home"></use>
          </svg>
        )}
        {type === "其它" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-other"></use>
          </svg>
        )}
        {type === "薪酬" && (
          <svg
            className="icon"
            aria-hidden="true"
            style={{ width: `${size}px`, height: `${size}px`, color }}
          >
            <use xlinkHref="#icon-salary"></use>
          </svg>
        )}
      </main>
    );
}
export default Icon