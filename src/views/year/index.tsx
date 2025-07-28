import type { FC } from 'react';
import styles from './style.module.scss'
import { useState, useEffect } from 'react';
import { Picker, Toast } from 'antd-mobile';
import { DownOutline } from 'antd-mobile-icons';
import dayjs from 'dayjs';
import Icon from '@/components/Icon';
import ScrollNumber from '@/components/ScrollNumber';
import ReactECharts from 'echarts-for-react';

const Year: FC = () => {
    const [currentYear, setCurrentYear] = useState(dayjs().format('YYYY'));
    const [activeTab, setActiveTab] = useState<'out' | 'income'>('out');
    const [yearColumns, setYearColumns] = useState([]);
    
    // 模拟年度数据
    const [yearData, setYearData] = useState({
        out: '123452',
        income: '98765',
        lastYearOut: '174663',
        lastYearIncome: '87654',
        monthlyAvgOut: '10287', // 月均支出
        monthlyAvgIncome: '8230', // 月均收入
        balance: '-24687', // 收支结余
        topTransactions: [
            { type: '转账', amount: 36000, icon: '转账' },
            { type: '教育', amount: 15000, icon: '娱乐' },
            { type: '人情社交', amount: 12000, icon: '餐饮' },
            { type: '购物', amount: 8500, icon: '购物' },
            { type: '餐饮', amount: 7200, icon: '餐饮' },
            { type: '交通', amount: 6800, icon: '交通' },
            { type: '旅游', amount: 5500, icon: '旅游' },
            { type: '娱乐', amount: 4200, icon: '娱乐' },
            { type: '通讯', amount: 3600, icon: '通讯' },
            { type: '加油充电', amount: 2800, icon: '加油充电' }
        ],
        monthlyData: [
            { month: '01', amount: 8500 },
            { month: '02', amount: 12000 },
            { month: '03', amount: 15600 },
            { month: '04', amount: 9800 },
            { month: '05', amount: 11200 },
            { month: '06', amount: 13400 },
            { month: '07', amount: 16800 },
            { month: '08', amount: 14200 },
            { month: '09', amount: 10600 },
            { month: '10', amount: 12800 },
            { month: '11', amount: 15200 },
            { month: '12', amount: 18900 }
        ]
    });
    
    useEffect(() => {
        // 生成近10年的年份选项
        const currentYearNum = parseInt(dayjs().format('YYYY'));
        const years = [];
        for (let i = currentYearNum - 9; i <= currentYearNum; i++) {
            years.push({ label: `${i}年`, value: `${i}` });
        }
        setYearColumns([years]);
    }, []);
    
    const handleYearChange = async () => {
        try {
            const value = await Picker.prompt({
                columns: yearColumns,
                defaultValue: [currentYear],
            });
            if (value && value[0]) {
                setCurrentYear(value[0]);
                // 这里可以添加获取对应年份数据的逻辑
                Toast.show(`切换到${value[0]}年`);
            }
        } catch (error) {
            // 用户取消选择
        }
    };
    
    const getCurrentData = () => {
        return activeTab === 'out' ? yearData.out : yearData.income;
    };
    
    const getLastYearData = () => {
        return activeTab === 'out' ? yearData.lastYearOut : yearData.lastYearIncome;
    };
    
    const getCompareText = () => {
        const current = parseFloat(getCurrentData());
        const lastYear = parseFloat(getLastYearData());
        const diff = current - lastYear;
        return diff >= 0 ? `+${Math.abs(diff).toFixed(0)}` : `-${Math.abs(diff).toFixed(0)}`;
    };
    
    return (
        <main className={styles.container}>
            {/* 头部 */}
            <header className={styles.header}>
                <div className={styles.yearSelector} onClick={handleYearChange}>
                    <span>{currentYear}年</span>
                    <DownOutline className={styles.downIcon} />
                </div>
                <div className={styles.tabButtons}>
                    <button 
                        className={`${styles.tabButton} ${activeTab === 'out' ? styles.active : ''}`}
                        onClick={() => setActiveTab('out')}
                    >
                        支出
                    </button>
                    <button 
                        className={`${styles.tabButton} ${activeTab === 'income' ? styles.active : ''}`}
                        onClick={() => setActiveTab('income')}
                    >
                        收入
                    </button>
                </div>
            </header>
            
            {/* 统计信息 */}
            <section className={styles.statsSection}>
                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <span className={styles.label}>今年{activeTab === 'out' ? '支出' : '收入'}</span>
                        <span className={styles.amount}>
                            <ScrollNumber value={getCurrentData()} />
                        </span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.label}>月均{activeTab === 'out' ? '支出' : '收入'}</span>
                        <span className={styles.amount}>
                            <ScrollNumber value={activeTab === 'out' ? yearData.monthlyAvgOut : yearData.monthlyAvgIncome} />
                        </span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.label}>同比上年</span>
                        <span className={`${styles.compareAmount} ${getCompareText().startsWith('+') ? styles.increase : styles.decrease}`}>
                            {getCompareText()}
                        </span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.label}>收支结余</span>
                        <span className={`${styles.amount} ${yearData.balance.startsWith('-') ? styles.negative : styles.positive}`}>
                            <ScrollNumber value={yearData.balance} />
                        </span>
                    </div>
                </div>
            </section>
            
            {/* 最大额交易排名 */}
            <section className={styles.rankingSection}>
                <h3 className={styles.sectionTitle}>最大额交易前10排名</h3>
                <div className={styles.rankingList}>
                    {yearData.topTransactions.map((item, index) => (
                        <div key={index} className={styles.rankingItem}>
                            <div className={styles.rankingLeft}>
                                <Icon type={item.icon} size={24} color="#666" />
                                <span className={styles.transactionType}>{item.type}</span>
                            </div>
                            <span className={styles.transactionAmount}>-{item.amount}</span>
                        </div>
                    ))}
                </div>
            </section>
            
            {/* 分月支出折线图 */}
            <section className={styles.chartSection}>
                <h3 className={styles.sectionTitle}>分月支出折线图</h3>
                <div className={styles.chartContainer}>
                    <ReactECharts
                        option={{
                            title: {
                                text: '月度支出趋势',
                                left: 'center',
                                textStyle: {
                                    fontSize: 14,
                                    color: '#333'
                                }
                            },
                            tooltip: {
                                trigger: 'axis',
                                formatter: '{b}月: ¥{c}'
                            },
                            xAxis: {
                                type: 'category',
                                data: yearData.monthlyData.map(item => `${item.month}月`),
                                axisLabel: {
                                    fontSize: 12,
                                    color: '#666'
                                }
                            },
                            yAxis: {
                                type: 'value',
                                axisLabel: {
                                    fontSize: 12,
                                    color: '#666',
                                    formatter: '¥{value}'
                                }
                            },
                            series: [{
                                data: yearData.monthlyData.map(item => item.amount),
                                type: 'line',
                                smooth: true,
                                lineStyle: {
                                    color: '#667eea',
                                    width: 3
                                },
                                itemStyle: {
                                    color: '#667eea'
                                },
                                areaStyle: {
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'rgba(102, 126, 234, 0.3)'
                                        }, {
                                            offset: 1, color: 'rgba(102, 126, 234, 0.05)'
                                        }]
                                    }
                                }
                            }],
                            grid: {
                                left: '10%',
                                right: '10%',
                                bottom: '15%',
                                top: '20%'
                            }
                        }}
                        style={{ height: '300px', width: '100%' }}
                    />
                </div>
            </section>
            
            {/* 支出占比饼图 */}
            <section className={styles.pieSection}>
                <h3 className={styles.sectionTitle}>支出占比饼图</h3>
                <div className={styles.pieContainer}>
                    <ReactECharts
                        option={{
                            title: {
                                text: '支出类型分布',
                                left: 'center',
                                textStyle: {
                                    fontSize: 14,
                                    color: '#333'
                                }
                            },
                            tooltip: {
                                trigger: 'item',
                                formatter: '{a} <br/>{b}: ¥{c} ({d}%)'
                            },
                            legend: {
                                orient: 'horizontal',
                                bottom: '5%',
                                left: 'center',
                                textStyle: {
                                    fontSize: 12,
                                    color: '#666'
                                }
                            },
                            series: [{
                                name: '支出类型',
                                type: 'pie',
                                radius: ['40%', '70%'],
                                center: ['50%', '45%'],
                                avoidLabelOverlap: false,
                                label: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    label: {
                                        show: true,
                                        fontSize: '16',
                                        fontWeight: 'bold'
                                    }
                                },
                                labelLine: {
                                    show: false
                                },
                                data: [
                                    { value: 36000, name: '转账', itemStyle: { color: '#ff6b6b' } },
                                    { value: 25000, name: '教育', itemStyle: { color: '#4ecdc4' } },
                                    { value: 20000, name: '购物', itemStyle: { color: '#45b7d1' } },
                                    { value: 15000, name: '餐饮', itemStyle: { color: '#96ceb4' } },
                                    { value: 12000, name: '交通', itemStyle: { color: '#feca57' } },
                                    { value: 10000, name: '娱乐', itemStyle: { color: '#ff9ff3' } },
                                    { value: 5452, name: '其他', itemStyle: { color: '#54a0ff' } }
                                ]
                            }]
                        }}
                        style={{ height: '350px', width: '100%' }}
                    />
                </div>
            </section>
        </main>
    );
};

export default Year;
