import { api } from '@/commons/lib/api';
import { useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    console.log('Dashboard mounted');
    api.get('/v1/admin/categories').then((response) => {
      console.log(response.data);
    });

    return () => {
      console.log('Dashboard unmounted');
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl">Dashboard</h1>
    </>
  );
}
