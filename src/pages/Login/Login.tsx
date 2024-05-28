import useAuthStore from '@/commons/store/useAuthStore';
import { useLoginQuery } from '@/services/queries/auth.query';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [errorResponse, setErrorResponse] = useState('');
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { isAuthenticated, setIsAuthenticated } = useAuthStore((state) => state);
  const { mutateAsync: login, isError, error } = useLoginQuery();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await form.validateFields();
    const values = form.getFieldsValue();
    try {
      const res = await login(values);
      setIsAuthenticated(true, res.authorization.accessToken);
      navigate('/dashboard');
    } catch (err) {
      console.log('error auth: ', err);
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
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <>
      <section className="container" id="login">
        <div className="login-image">
          <img
            className="login-image-main"
            src={`${import.meta.env.VITE_APP_URL}./images/login.png`}
            alt={`${import.meta.env.VITE_APP_NAME} - hero image login`}
          />

          {/* image decoration */}
          <img
            className="login-image-1"
            src={`${import.meta.env.VITE_APP_URL}./images/decoration.png`}
            alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
            style={{
              zIndex: -1,
              position: 'absolute',
              top: '70%',
              left: '98%',
            }}
          />

          <img
            className="login-image-2"
            src={`${import.meta.env.VITE_APP_URL}./images/decoration.png`}
            alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
            style={{
              zIndex: -1,
              position: 'absolute',
              top: 0,
              left: 0,
              translate: '-120% -50%',
            }}
          />
        </div>
        <div className="login-form px-20">
          <h1>Login</h1>
          <p className="text-center mt-1">Hey, enter your details to get sign in to your account</p>

          <Form form={form} autoComplete="off" layout="vertical" className="mt-6">
            <Form.Item
              label="Email/Phone Number"
              name="email"
              className="font-semibold"
              rules={[{ required: false }]}
              validateStatus="error"
              help="Should be combination of numbers & alphabets"
            >
              <Input placeholder="email" size="large" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              className="font-semibold"
              rules={[{ required: false }]}
            >
              <Input.Password placeholder="Password" size="large" />
            </Form.Item>
            <Button
              type="primary"
              onClick={handleSubmit}
              className="w-full bg-color-[#18428F]"
              size="large"
              style={{
                backgroundColor: '#18428F',
                borderColor: '#18428F',
                borderRadius: '25rem',
              }}
            >
              Login
            </Button>
          </Form>

          {isError && <p className="mt-4 text-sm text-center text-red-600">{errorResponse}</p>}

          <Link to="/register" className="w-100 highlight text-center mt-4 flex justify-center">
            Doesn't Have account yet? Register here!
          </Link>
        </div>
      </section>
    </>
  );
}
