import { useEffect, type FC, useState,useRef } from "react";

import styles from "./style.module.scss";
import { CalendarPicker, Toast } from "antd-mobile";
import { useSelector } from "react-redux";
import { ClockCircleFill } from "antd-mobile-icons";
import dayjs from "dayjs";
import classNames from "classnames";
import TypeList from "../typelist";
import { useDispatch } from "react-redux";
import { setBillItem } from "@/store/modules/billStore";
import { v4 as uuidv4 } from "uuid";
// @ts-expect-error 忽略类型检查错误
const Add: FC = ({ onShow }) => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [min, setMin] = useState<Date>(new Date());
  const [max, setMax] = useState<Date>(new Date());
  // @ts-expect-error 忽略类型检查错误
  const { viewMonth } = useSelector((state) => state.bill);
  const [active, setActive] = useState<number>(0); //0支出1收入
  const [type, setType] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const addBill = (type: string, date: Date, money: number, useFor: string) => {
    if (!useFor) {
      Toast.show("请选择资金来源/用途");
      return;
    }
    const bill = {
      type,
      date: dayjs(date).format("YYYY-MM-DD"), // 将Date对象转换为字符串
      money:Number(money),
      useFor,
      id: uuidv4(),
      };
    //   重置输入框
      setAmount('')
    // 重置类型
    setType('')
    dispatch(setBillItem(bill));
    onShow();
  };
  useEffect(() => {
    // 获取viewMonth当月的第一天
    const monthStart = dayjs(viewMonth).startOf("month").toDate();
    // 获取viewMonth当月的最后一天
    const monthEnd = dayjs(viewMonth).endOf("month").toDate();
    // 获取当前时间
    const now = new Date();

    // 设置最小日期为当月第一天
    setMin(monthStart);
    // 设置最大日期为当月最后一天和当前时间的较小值
    setMax(monthEnd > now ? now : monthEnd);

    // 设置默认选择日期为当前时间（如果在当月范围内）
    if (now >= monthStart && now <= monthEnd) {
      setSelectedDate(now);
    } else {
      setSelectedDate(monthStart);
    }
  }, [viewMonth]);
    useEffect(() => {
      if (inputRef.current) {
        setTimeout(() => {
            inputRef.current.focus();
        }, 1000);
      }
    }, [isShow]);
  return (
    <div className={styles.container}>
      <section style={{ backgroundColor: "rgba(39, 203, 66,0.4)" }}>
        <header className={styles.container_header}>
          <span>记一笔</span>
        </header>
        <section className={styles.container_body}>
          <div className={styles.container_body_item}>
            <button
              className={classNames(styles.container_body_item_btn2, {
                [styles.container_body_item_btn1]: active === 1,
              })}
              onClick={() => {
                setActive(1);
              }}
            >
              收入
            </button>
            <button
              className={classNames(styles.container_body_item_btn2, {
                [styles.container_body_item_btn1]: active === 0,
              })}
              onClick={() => {
                setActive(0);
              }}
            >
              支出
            </button>
          </div>
          <div className={styles.container_body_input}>
            <div
              onClick={() => {
                setIsShow(true);
              }}
              className={styles.container_body_input_date}
            >
              {dayjs(selectedDate).format("YYYY-MM-DD") ===
              dayjs(new Date()).format("YYYY-MM-DD") ? (
                <div className={styles.container_body_input_date}>
                  <ClockCircleFill className={styles.date_icon} />
                  <span>今天</span>
                </div>
              ) : (
                <span>{dayjs(selectedDate).format("MM月DD日")}</span>
              )}
            </div>
            <input
              type="number"
            placeholder="0.00"
            ref={inputRef}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <span className={styles.container_body_input_flag}>￥</span>
          </div>
        </section>
      </section>
      {/* @ts-expect-error 忽略类型检查错误 */}
      <TypeList onTypeChange={setType} chooseed={type} />
      <footer className={styles.container_footer}>
        <button
          onClick={() => {
            onShow();
          }}
          className={styles.container_footer_cancel}
        >
          取消
        </button>
        <button
          onClick={() => {
            addBill(
              active === 0 ? "pay" : "income",
              dayjs(selectedDate).toDate(),
              Number(amount),
              type
            );
          }}
          className={styles.container_footer_confirm}
        >
          确定
        </button>
      </footer>
      <CalendarPicker
        min={min}
        max={max}
        value={selectedDate}
        selectionMode="single"
        visible={isShow}
        onClose={() => setIsShow(false)}
        onMaskClick={() => setIsShow(false)}
        onChange={(date) => {
          setSelectedDate(date);
        }}
        onConfirm={(date) => {
          setSelectedDate(date);
          setIsShow(false);
        }}
      />
    </div>
  );
};
export default Add;
