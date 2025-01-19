import React, { createContext, useContext, ReactNode } from 'react';
import api from '../api'; // 导入集中管理的 API
import type { ApiType } from '../api'; // 导入类型

// 创建 Context 的类型（初始值为 null）
const ApiContext = createContext<ApiType | null>(null);

// 定义 Provider Props 类型
interface ApiProviderProps {
  children: ReactNode; // 声明 children 类型
}

// Provider 组件
export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
};

// 自定义 Hook 方便组件使用 API
export const useApi = (): ApiType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};