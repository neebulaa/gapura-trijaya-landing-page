import FormItem from '@/commons/components/Form/FormItem';
import useAuthStore from '@/commons/store/useAuthStore';
import useUserStore from '@/commons/store/useUserStore';
import { me } from '@/services/api/auth.service';
import { useLoginQuery } from '@/services/queries/auth.query';
import { IValidationErrors } from '@/types/base';
import { App, Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const { message } = App.useApp();
  /**
   * State
   */
  const [errorResponse, setErrorResponse] = useState('');
  const [validationErrors, setValidationErrors] = useState<IValidationErrors | null>({
    message: '',
    errors: {},
  });
  const navigate = useNavigate();
  const [form] = Form.useForm();

  /**
   * Hooks
   */
  const { isAuthenticated, setIsAuthenticated } = useAuthStore((state) => state);
  const { setUserData } = useUserStore((state) => state);
  const {
    mutateAsync: queryLogin,
    isPending: queryLoginIsFetching,
    isError,
    error,
  } = useLoginQuery();

  /**
   * Handle Login Submit
   */
  const handleSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    setValidationErrors(null);

    try {
      const res = await queryLogin(values);
      setIsAuthenticated(true, res.authorization.accessToken);
      await me().then((res) => {
        setUserData(res!.data);
      });
      navigate('/');
    } catch (err: any) {
      if (err?.response && err?.response.status === 422) {
        setValidationErrors(err.response.data);
        return;
      }
      if (err?.response && err?.response.status === 401) {
        setErrorResponse(err.response.data.message);
        return;
      }
      message.error('Oops! Something went wrong. Please try again.');
      console.log('error auth: ', err);
    }
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (isError) {
      setErrorResponse((error as any).response.data.message);
      errorResponse && message.error(errorResponse);
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
        <div className="login-form">
          <h1>Login</h1>
          <p className="text-center mt-1">Hey, enter your details to get sign in to your account</p>

          <Form form={form} autoComplete="off" layout="vertical" className="mt-6">
            <FormItem
              label="Email/Phone Number"
              name="email"
              className="font-semibold"
              rules={[{ required: false }]}
              validationErrors={validationErrors}
            >
              <Input placeholder="email" size="large" />
            </FormItem>
            <FormItem
              label="Password"
              name="password"
              className="font-semibold"
              rules={[{ required: false }]}
              validationErrors={validationErrors}
            >
              <Input.Password placeholder="Password" size="large" />
            </FormItem>
            <Button
              type="primary"
              onClick={handleSubmit}
              className="w-full bg-color-[#18428F]"
              size="large"
              loading={queryLoginIsFetching}
              style={{
                backgroundColor: '#18428F',
                borderColor: '#18428F',
                borderRadius: '25rem',
              }}
            >
              Login
            </Button>
          </Form>

          <Link to="/register" className="w-100 highlight text-center mt-4 flex justify-center">
            Doesn't Have account yet? Register here!
          </Link>
        </div>
      </section>
    </>
  );
}
