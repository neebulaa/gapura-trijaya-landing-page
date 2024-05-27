import { Link, Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <>
      <div className="font-mono h-screen">
        <div className="flex flex-col h-screen">
          <header className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl">Header</h1>
            <div className="flex gap-4">
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/login">Login</Link>
            </div>
          </header>
          <main className="flex-grow p-0">
            <Outlet />
          </main>
          <footer className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl">Footer</h1>
          </footer>
        </div>
      </div>
    </>
  );
}
