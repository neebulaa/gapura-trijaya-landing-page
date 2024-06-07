import '@/commons/assets/css/App.css';
import { Router } from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, ThemeConfig } from 'antd';
import { useEffect } from 'react';
import { getItem } from './commons/lib/localStorage';
import { LogoutUserSession } from './commons/utils/Abilities/UserSessionPersistent';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        networkMode: 'online',
      },
    },
  });

  const config: ThemeConfig = {
    token: {
      // colorPrimary: "#1890ff",
      colorPrimary: '#002140',
      fontFamily: 'Poppins, sans-serif',
      // Seed Token
      // colorPrimary: '#00b96b',
      // borderRadius: 2,

      // Alias Token
      // colorBgContainer: "#002140",
      // colorBgContainer: "#fff",
    },
  };

  useEffect(() => {
    const userData = getItem('userData');
    if (!userData) {
      LogoutUserSession();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={config}>
        <Router />
      </ConfigProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
