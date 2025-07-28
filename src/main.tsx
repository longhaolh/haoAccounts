import { createRoot } from 'react-dom/client'
import router from '@/router'
import {RouterProvider} from 'react-router-dom'
import { unstableSetRender } from 'antd-mobile'; // Support since version ^5.40.0
// 导入定制主题
import '@/theme.scss'
// 导入redux
import { Provider } from 'react-redux';
import store from '@/store';

// 设置antd-mobile的渲染函数以兼容React 19
unstableSetRender((node, container) => {
  // ||= 是逻辑空赋值运算符，只有当 container._reactRoot 为空时才会赋值
  // @ts-expect-error 忽略类型检查错误
  container._reactRoot ||= createRoot(container);
  // @ts-expect-error 忽略类型检查错误
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
