import { useEffect, useState, type FC } from 'react'
import styles from './style.module.scss'
import dayjs from 'dayjs'
import classNames from 'classnames'
import Icon from '@/components/Icon'
import { DownFill } from 'antd-mobile-icons'
// @ts-expect-error 忽略类型检查错误
const BillItem: FC = ({date,bills}) => {
    useEffect(() => {
        let pay: number = 0
        let income: number = 0
        bills.forEach(item => {
            // 确保使用数字进行计算
            const moneyValue = parseFloat(item.money)
            if(item.type==='pay' || item.type==='0'){
                pay -= moneyValue  // 支出为负数
            }else{
                income += moneyValue  // 收入为正数
            }
        })
        setIncome(Number(income.toFixed(2)))
        setPay(Number(Math.abs(pay).toFixed(2)))  // 显示支出的绝对值
        setSurplus(Number((income+pay).toFixed(2)))  // 结余 = 收入 + 支出(负数)
    }, [bills])
    const [pay,setPay] = useState<number>(0)
    const [income, setIncome] = useState<number>(0)
    const [surplus, setSurplus] = useState<number>(0)
    const [isShow, setIsShow] = useState<boolean>(true)
   
    return (
      <main className={styles.container}>
        <section className={styles.daycard}>
          <header className={styles.daycard_header}>
            <div className={styles.daytime}>
              <span>{dayjs(date).format("MM月DD日")}</span>
              <DownFill
                onClick={() => {
                  setIsShow(!isShow);
                }}
                className={classNames(styles.daytime_icon, {
                  [styles.daytime_icon_rotate]: !isShow,
                })}
              />
            </div>
            <div className={styles.dayInfo}>
              <div className={styles.dayInfo_outIn}>
                <span style={{ color: "red" }}>支出 {pay}</span>
                <span style={{ color: "green" }}>收入 {income}</span>
              </div>
              <div className={styles.dayInfo_surplus}>
                <span style={{ color: surplus >= 0 ? "green" : "red" }}>
                  {surplus >= 0 ? "+" + surplus : surplus}
                </span>
                <span>结余</span>
              </div>
            </div>
          </header>
          <section
            style={{ height: isShow ? bills.length * 50 + "px" : 0 }}
            className={styles.dayInfo_feeList}
          >
            {bills.map((item) => {
              return (
                <div key={item.id} className={styles.dayInfo_feeItem}>
                  <div className={styles.dayInfo_feeItem_left}>
                    {/* @ts-expect-error 忽略类型检查错误 */}
                    <Icon type={item.useFor} size={25} />
                    <span className={styles.dayInfo_feeItem_title}>
                      {item.useFor}
                    </span>
                  </div>
                  <div className={styles.dayInfo_feeItem_right}>
                    <span
                      className={styles.dayInfo_feeItem_subtitle}
                      style={{
                        color: item.type === "income" || item.type === "1" ? "green" : "red",
                      }}
                    >
                      {item.moneyWithSign || (item.type === "income" || item.type === "1" ? "+" + item.money : item.money)}
                    </span>
                  </div>
                </div>
              );
            })}
          </section>
        </section>
      </main>
    );
}
export default BillItem
