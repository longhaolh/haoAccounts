import { type FC,useState } from "react";
import styles from "./style.module.scss";
import Icon from "@/components/Icon";
import { RightOutline } from "antd-mobile-icons";
import classNames from "classnames";
const typeList = [
  "购物",
  "餐饮",
  "旅游",
  "转账",
  "停车费",
  "交通",
  "加油充电",
  "通讯",
  "还款",
  "娱乐",
  "红包",
  "外卖",
  "教育",
  "酒店住宿",
  "住房租金",
  "其它",
  "薪酬",
];
// @ts-expect-error 忽略类型检查错误
const TypeList: FC = ({ onTypeChange, chooseed }) => {
  const [type, setType] = useState("");
  const handleChoose = (types: string) => {
    if (type === types) {
      setType("");
      return;
    }
    setType(types);
    onTypeChange(types);
  };
  return (
    <div className={styles.container}>
      {typeList.map((item) => {
        return (
          <section
            key={item}
            onClick={() => handleChoose(item)}
            className={classNames(styles.item, {
              [styles.item_active]: item === type&&item === chooseed,
            })}
          >
            <div className={styles.item_left}>
              {/* @ts-expect-error 忽略类型检查错误 */}
              <Icon type={item}
                size={25}
                color={item === type ? "rgb(226, 165, 11)" : ""}
              />
              <span>{item}</span>
            </div>
            <div className={styles.item_right}>
              <RightOutline />
            </div>
          </section>
        );
      })}
    </div>
  );
};
export default TypeList;
