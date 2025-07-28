import type { FC } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { getBillList } from '@/store/modules/billStore';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { TabBar, Badge } from "antd-mobile";
import { BillOutline, PayCircleOutline } from 'antd-mobile-icons';
import styles from './style.module.scss'

const tabs = [
    {
      key: '/month',
      title: '月度账单',
      icon: <BillOutline />,
      badge: Badge.dot,
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <PayCircleOutline />
    }
]
const Layout: FC = () => {
    const dispatch = useDispatch()
    const hasLoadedRef = useRef(false)
  const navigate = useNavigate()
    useEffect(() => {
        // 防止重复加载数据
        if (!hasLoadedRef.current) {
            hasLoadedRef.current = true
            // @ts-expect-error 忽略类型检查错误
            dispatch(getBillList())
        }
    }, [dispatch])
    return (
      <main className={styles.container}>
        <Outlet />
        <TabBar className={styles.tabBar}>
          {tabs.map((item) => (
            <TabBar.Item
              key={item.key}
              icon={item.icon}
              title={item.title}
              badge={item.badge}
              onClick={() => {
                  navigate(item.key);
              }}
            />
          ))}
        </TabBar>
        
      </main>
    );
}
export default Layout
