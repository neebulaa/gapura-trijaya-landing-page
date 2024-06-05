import FormItem from '@/commons/components/Form/FormItem';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import useAuthStore from '@/commons/store/useAuthStore';
import useUserStore from '@/commons/store/useUserStore';
import { me } from '@/services/api/auth.service';
import { useRegisterQuery } from '@/services/queries/auth.query';
import { IValidationErrors } from '@/types/base';
import { App, Button, Form, Input, Row } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
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

  /**
   * Query
   */
  const {
    mutateAsync: queryRegister,
    isPending: queryRegisterIsFetching,
    isError,
    error,
  } = useRegisterQuery();

  /**
   * Handle Register Submit
   */
  const handleRegister = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    setValidationErrors(null);

    try {
      const res = await queryRegister(values);
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
   * Effect
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
    <section className="container" id="register">
      <div className="register-form">
        <h1>Register</h1>
        <p className="mt-1 text-center">Hey, enter your details to get create your account</p>
        {/* Form */}
        <Form form={form} autoComplete="off" layout="vertical" className="mt-6">
          <Row gutter={10}>
            <ResponsiveCol span={24} md={12}>
              <FormItem
                label="Name"
                name="name"
                className="font-normal"
                rules={[{ required: true }]}
                validationErrors={validationErrors}
              >
                <Input placeholder="name" size="large" />
              </FormItem>
            </ResponsiveCol>
            <ResponsiveCol span={24} md={12}>
              <FormItem
                label="Email"
                name="email"
                className="font-normal"
                rules={[{ required: true }]}
                validationErrors={validationErrors}
              >
                <Input placeholder="email" size="large" />
              </FormItem>
            </ResponsiveCol>
          </Row>
          <Row>
            <ResponsiveCol span={24} md={24}>
              <FormItem
                label="Phone Number (Whatsapp)"
                name="phone"
                className="font-normal"
                rules={[{ required: true }]}
                validationErrors={validationErrors}
              >
                <Input addonBefore={`+62`} placeholder="phone" size="large" />
              </FormItem>
            </ResponsiveCol>
          </Row>
          <Row gutter={10}>
            <ResponsiveCol span={24} md={12}>
              <FormItem
                label="Password"
                name="password"
                className="font-normal"
                rules={[{ required: true }]}
                validationErrors={validationErrors}
              >
                <Input.Password placeholder="Password" size="large" />
              </FormItem>
            </ResponsiveCol>
            <ResponsiveCol span={24} md={12}>
              <FormItem
                label="Password Confirmation"
                name="passconf"
                className="font-normal"
                rules={[{ required: true }]}
                validationErrors={validationErrors}
              >
                <Input.Password placeholder="Password Confirmation" size="large" />
              </FormItem>
            </ResponsiveCol>
          </Row>
          <Button
            type="primary"
            onClick={handleRegister}
            className="w-full bg-color-[#18428F]"
            size="large"
            loading={queryRegisterIsFetching}
            style={{
              backgroundColor: '#18428F',
              borderColor: '#18428F',
              borderRadius: '25rem',
            }}
          >
            Register
          </Button>
        </Form>
        {/* ./Form */}
        <Link to="/login" className="flex mt-4 highlight justify-center">
          Already have account? Login now!
        </Link>
      </div>

      <div className="register-image">
        <img
          className="register-image-main"
          src={`${import.meta.env.VITE_APP_URL}./images/register.png`}
          alt={`${import.meta.env.VITE_APP_NAME} - hero image register`}
        />
        {/* image decoration */}
        <img
          className="register-image-1"
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
          className="register-image-2"
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
    </section>
  );
}
