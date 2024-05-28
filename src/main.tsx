import App from '@/App.tsx';
import '@/commons/assets/css/tailwind.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App as AntdApp } from 'antd';

// console.log(import.meta.env.VITE_API_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AntdApp>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AntdApp>
);
