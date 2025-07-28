import { createSlice } from "@reduxjs/toolkit";
import get from '@/api'
import dayjs from 'dayjs'
const billStore = createSlice({
    name: 'billStore',
    initialState: {
        billList: [],
        monthBill: [],
        yearBill:[],
        billInfo:{},
        viewMonth: dayjs(new Date()).format('YYYY-MM'),
        viewYear: dayjs(new Date()).format('YYYY')
    },
    reducers: {
        setBillList(state, action) {
            state.billList = action.payload
        },
        setMonthBill(state, action) {
            state.monthBill = action.payload
        },
        setBillInfo(state, action) {
            state.billInfo = action.payload
        },
        setMonth(state, action) {
            state.viewMonth = action.payload
        },
        setYear(state, action) {
            state.viewYear = action.payload
        },
        setBillItem(state, action) {
            state.billList = [...state.billList, action.payload]
            // 重新排序
            state.billList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            
            // 更新monthBill
            // 提取日期部分
            const dateKey = action.payload.date
            // 查找是否已有该日期的账单组
            const existingDateGroup = state.monthBill.find(item => item.date === dateKey)
            
            // 根据类型添加符号到金额
            const billWithSign = {...action.payload}
            if (billWithSign.type === '0' || billWithSign.type === 'pay') {
                // 支出添加负号
                billWithSign.moneyWithSign = `-${billWithSign.money}`
            } else if (billWithSign.type === '1' || billWithSign.type === 'income') {
                // 收入添加正号
                billWithSign.moneyWithSign = `+${billWithSign.money}`
            }
            
            if (existingDateGroup) {
                // 如果已有该日期的账单组，将新账单添加到该组
                existingDateGroup.bills.push(billWithSign)
                // 重新排序该组内的账单
                existingDateGroup.bills.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            } else {
                // 如果没有该日期的账单组，创建新组
                state.monthBill = [...state.monthBill, {
                    date: dateKey,
                    bills: [billWithSign]
                }]
                // 重新排序所有账单组
                state.monthBill.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            }
            
            // 更新billInfo
            if (!state.billInfo) {
                state.billInfo = {
                    billTitle: `${dayjs().format('YYYY')}年${dayjs().format('MM')}月账单`,
                    out: '0.00',
                    income: '0.00',
                    surplus: '0.00',
                    outItems: [],
                    incomeItems: []
                }
            }
            
            // 根据账单类型更新总收入或总支出
            if (action.payload.type === '0' || action.payload.type === 'pay') {
              // 支出
              // 转换为数字计算，然后再转回字符串保留两位小数
              // @ts-expect-error 忽略类型检查错误
                const currentOut = parseFloat(state.billInfo.out || "0");
                // @ts-expect-error 忽略类型检查错误
              state.billInfo.out = (currentOut + action.payload.money).toFixed(2);
              // 更新结余
              // @ts-expect-error 忽略类型检查错误
              const currentIncome = parseFloat(state.billInfo.income || "0");
              // @ts-expect-error 忽略类型检查错误
              state.billInfo.surplus = (
                currentIncome -
                (currentOut + action.payload.money)
              ).toFixed(2);
              // 更新支出明细
              // @ts-expect-error 忽略类型检查错误
              if (!state.billInfo.outItems) {
                // @ts-expect-error 忽略类型检查错误
                state.billInfo.outItems = [];
              }
              // 添加到支出明细，包含金额和用途
              // @ts-expect-error 忽略类型检查错误
              state.billInfo.outItems.push({
                money: "-" + action.payload.money,
                useFor: action.payload.useFor,
              });
            } else if (action.payload.type === '1' || action.payload.type === 'income') {
              // 收入
              // 转换为数字计算，然后再转回字符串保留两位小数
              // @ts-expect-error 忽略类型检查错误
              const currentIncome = parseFloat(state.billInfo.income || "0");
              // @ts-expect-error 忽略类型检查错误
              state.billInfo.income = (
                currentIncome + action.payload.money
              ).toFixed(2);
              // 更新结余
              // @ts-expect-error 忽略类型检查错误
              const currentOut = parseFloat(state.billInfo.out || "0");
              // @ts-expect-error 忽略类型检查错误
              state.billInfo.surplus = (
                currentIncome +
                action.payload.money -
                currentOut
              ).toFixed(2);
              
              // 更新收入明细
              // @ts-expect-error 忽略类型检查错误
              if (!state.billInfo.incomeItems) {
                // @ts-expect-error 忽略类型检查错误
                state.billInfo.incomeItems = [];
              }
              // 添加到收入明细，包含金额和用途
              // @ts-expect-error 忽略类型检查错误
              state.billInfo.incomeItems.push({
                money: "+" + action.payload.money,
                useFor: action.payload.useFor,
              });
            }
        }
    }
})
/** 异步请求 */
const getBillList = () => {
    return async (dispatch, getState) => {
        const { viewMonth } = getState().bill
        const res = await get(`/api/queryBillInfo?date=${viewMonth}`)
        // 保存原始账单列表
        dispatch(setBillList(res.data.ka))
        // 按日期分组数据
        const monthBillObj = {}
        res.data.ka.forEach(item => {
            // 剔除当前日期之后的账单
            if (
              item.date >
              dayjs(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()+1}`).format("YYYY-MM-DD")
            ) {
              return;
            }
           
            // 提取日期部分（不含时间）
            const dateKey = item.date.split(' ')[0]
            if (!monthBillObj[dateKey]) {
                monthBillObj[dateKey] = []
            }
            
            // 添加带符号的金额
            const billWithSign = {...item}
            if (billWithSign.type === '0' || billWithSign.type === 'pay') {
                // 支出添加负号
                billWithSign.moneyWithSign = `-${billWithSign.money}`
            } else if (billWithSign.type === '1' || billWithSign.type === 'income') {
                // 收入添加正号
                billWithSign.moneyWithSign = `+${billWithSign.money}`
            }
            
            monthBillObj[dateKey].push(billWithSign)
        })
        // 将对象转换为数组格式
        const monthBillData = Object.keys(monthBillObj).map(date => ({
            date,
            bills: monthBillObj[date]
        })).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 按日期降序排序
        
        console.log('monthBillData', monthBillData)
        // 更新monthBill
        dispatch(setMonthBill(monthBillData))
        dispatch(setBillInfo(res.data.billInfo))
    }
}
// 解构action
const { setBillList, setMonthBill, setBillInfo, setMonth, setYear, setBillItem } = billStore.actions

// 导出action
export { getBillList, setMonth, setYear, setBillItem }

// 导出state
export default billStore.reducer