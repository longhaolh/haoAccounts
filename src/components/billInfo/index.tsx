import { DownOutline } from "antd-mobile-icons";
import type { FC } from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { Picker, Toast } from "antd-mobile";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'
import { useDispatch } from "react-redux";
import { setMonth } from "@/store/modules/billStore";
import {getBillList} from "@/store/modules/billStore";
import ScrollNumber from "@/components/ScrollNumber";

const BillInfo: FC = () => {
    const dispatch = useDispatch()
  // @ts-expect-error 忽略类型检查错误
  const { billInfo } = useSelector((state) => state.bill);
  const [monthColumns, setMonthColumns] = useState([]);
  useEffect(() => {
    const columns = [
      [
        { label: "2010", value: "2010" },
        { label: "2011", value: "2011" },
        { label: "2012", value: "2012" },
        { label: "2013", value: "2013" },
        { label: "2014", value: "2014" },
        { label: "2015", value: "2015" },
        { label: "2016", value: "2016" },
        { label: "2017", value: "2017" },
        { label: "2018", value: "2018" },
        { label: "2019", value: "2019" },
        { label: "2020", value: "2020" },
        { label: "2021", value: "2021" },
        { label: "2022", value: "2022" },
        { label: "2023", value: "2023" },
        { label: "2024", value: "2024" },
        { label: "2025", value: "2025" },
      ],
      [
        { label: "01", value: "01" },
        { label: "02", value: "02" },
        { label: "03", value: "03" },
        { label: "04", value: "04" },
        { label: "05", value: "05" },
        { label: "06", value: "06" },
        { label: "07", value: "07" },
        { label: "08", value: "08" },
        { label: "09", value: "09" },
        { label: "10", value: "10" },
        { label: "11", value: "11" },
        { label: "12", value: "12" },
      ],
    ];
    setMonthColumns(columns);
  }, []);
  return (
    <main className={styles.container}>
      <section className={styles.count}>
        <div className={styles.count_top}>
          <div>
            <span
              onClick={async () => {
                const value = await Picker.prompt({
                  columns: monthColumns,
                  defaultValue: [dayjs(new Date()).format('YYYY'), dayjs(new Date()).format('MM')],
                });
                if(value[0]===dayjs(new Date()).format('YYYY') && value[1]>dayjs(new Date()).format('MM')){
                    Toast.show('不能选择未来时间')

                } else {
                    dispatch(setMonth(dayjs(value[0] + '-' + value[1]).format('YYYY-MM')))
                    // @ts-expect-error 忽略类型检查错误
                    dispatch(getBillList())
                }
            }}
            >
              {billInfo.billTitle}{" "}
            </span>{" "}
            <DownOutline />
          </div>
        </div>
        <div className={styles.count_bottom}>
          <div className={styles.count_bottom_item}>
            <span className={styles.count_bottom_item_title}>
              <ScrollNumber value={billInfo.out} />
            </span>
            <span className={styles.count_bottom_item_subtitle}>支出</span>
          </div>
          <div className={styles.count_bottom_item}>
            <span className={styles.count_bottom_item_title}>
              <ScrollNumber value={billInfo.income} />
            </span>
            <span className={styles.count_bottom_item_subtitle}>收入</span>
          </div>
          <div className={styles.count_bottom_item}>
            <span className={styles.count_bottom_item_title} style={{color: billInfo.surplus<0?'red':'green',fontSize:'1.5rem'}}>
              <ScrollNumber value={billInfo.surplus} />
            </span>
            <span className={styles.count_bottom_item_subtitle}>结余</span>
          </div>
        </div>
      </section>
    </main>
  );
};
export default BillInfo;
