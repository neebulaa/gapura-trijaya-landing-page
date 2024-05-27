import '@/commons/assets/css/App.css';
import { Router } from '@/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ConfigProvider, ThemeConfig } from 'antd';

function App() {
  const queryClient = new QueryClient();

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
