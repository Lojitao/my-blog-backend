import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

// import { Spinner } from '../components/ui/spinner';
import { MainErrorFallback } from '../components/errors/main';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    // <React.Suspense
    //   fallback={
    //     <div className="flex h-screen w-screen items-center justify-center">
    //       <Spinner size="xl" />
    //     </div>
    //   }
    // >
      // {/* 全局錯誤邊界 */}
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        {/* 渲染應用的主內容 */}
        {children}
      </ErrorBoundary>
    // </React.Suspense>
  );
};