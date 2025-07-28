import type { FC } from 'react';
import styles from './style.module.scss'
import BillInfo from '@/components/billInfo'
import BillItem from '@/components/billItem'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Popup } from 'antd-mobile';
import Add from '@/components/add'
import { AddCircleOutline } from 'antd-mobile-icons';

const Month: FC = () => {
    // @ts-expect-error 忽略类型检查错误
    const { monthBill } = useSelector((state) => state.bill)
  const [isShow, setIsShow] = useState<boolean>(false);
    
    return (
      <main className={styles.container}>
        <header>
          <h4 className={styles.title}>月度收支</h4>
        </header>
        <BillInfo />
        <section className={styles.billList}>
          {monthBill.map((item) => {
            return <BillItem key={item.date} {...item} />;
          })}
        </section>
        <div className={styles.add} onClick={()=>{
          setIsShow(true);
        }}>
          <AddCircleOutline />
        </div>
        <Popup
          visible={isShow}
          onMaskClick={() => {
            setIsShow(false);
          }}
          onClose={() => {
            setIsShow(false);
          }}
          bodyStyle={{
            height: "60vh",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
            overflow: "hidden",
          }}
        >
          {/* @ts-expect-error 忽略类型检查错误 */}
          <Add
            onShow={() => {
              setIsShow(!isShow);
            }}
          />
        </Popup>
      </main>
    );
}
export default Month
