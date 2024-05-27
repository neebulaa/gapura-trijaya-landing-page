import useAuthStore from '@/commons/store/useAuthStore';
import { useLoginQuery } from '@/services/queries/auth.query';
import { AuthDto } from '@/types/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorResponse, setErrorResponse] = useState('');
  const navigate = useNavigate();

  const { isAuthenticated, setIsAuthenticated } = useAuthStore(
    (state) => state
  );
  const { mutateAsync: login, isError, error } = useLoginQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data: AuthDto = {
        email,
        password,
      };
      const res = await login(data);
      setIsAuthenticated(true, res.authorization.accessToken);
      navigate('/dashboard');
    } catch (err) {
      console.log('error 1: ', err);
    }
  };

  useEffect(() => {
    if (isError) {
      // toast.error(error as string, { theme: 'colored' });
      setErrorResponse((error as any).response.data.message);
    }
  }, [isError]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated]);

  return (
    <>
      <div className="flex items-center justify-center min-h-full bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Login
              </button>
            </div>
          </form>
          {isError && (
            <p className="mt-4 text-sm text-center text-red-600">
              {errorResponse}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
