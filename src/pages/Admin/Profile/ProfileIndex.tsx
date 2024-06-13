import FormItem from '@/commons/components/Form/FormItem';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import usePageEffect from '@/commons/hooks/usePageEffect';
import { Button, Card, Col, Divider, Form, Input, Row, Space } from 'antd';
import useProfileIndexController from '@/pages/Admin/Profile/ProfileIndexController';

export default function ProfileIndex() {
  /** Controller */
  const { form, handleSubmit, validationErrors } = useProfileIndexController();

  usePageEffect({
    index: true,
    title: `Profile`,
  });

  return (
    <>
      <Card>
        <Row>
          <Form
            form={form}
            autoComplete="off"
            layout="vertical"
            className="w-full"
            onFinish={handleSubmit}
          >
            <Row gutter={24}>
              <ResponsiveCol span={24} md={12}>
                <FormItem
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true }]}
                  validationErrors={validationErrors}
                >
                  <Input placeholder="First Name" className="w-full" />
                </FormItem>
              </ResponsiveCol>
              <ResponsiveCol span={24} md={12}>
                <FormItem
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true }]}
                  validationErrors={validationErrors}
                >
                  <Input placeholder="Last Name" className="w-full" />
                </FormItem>
              </ResponsiveCol>
            </Row>

            <Row gutter={24}>
              <ResponsiveCol span={24} md={24}>
                <FormItem
                  label="Email"
                  name="email"
                  rules={[{ required: true }]}
                  validationErrors={validationErrors}
                >
                  <Input placeholder="Email" className="w-full" />
                </FormItem>
              </ResponsiveCol>
            </Row>

            <Divider orientation="left" plain orientationMargin="0">
              Password
            </Divider>
            <Row gutter={24}>
              <ResponsiveCol span={24} md={24}>
                <FormItem
                  label="Old Password"
                  name="oldPassword"
                  className="font-normal"
                  rules={[{ required: false }]}
                  validationErrors={validationErrors}
                >
                  <Input.Password placeholder="Old Password" />
                </FormItem>
              </ResponsiveCol>
            </Row>
            <Row gutter={24}>
              <ResponsiveCol span={24} md={24}>
                <FormItem
                  label="New Password"
                  name="newPassword"
                  className="font-normal"
                  rules={[{ required: false }]}
                  validationErrors={validationErrors}
                >
                  <Input.Password placeholder="New Password" />
                </FormItem>
              </ResponsiveCol>
            </Row>
            <Row gutter={24}>
              <ResponsiveCol span={24} md={24}>
                <FormItem
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  className="font-normal"
                  rules={[{ required: false }]}
                  validationErrors={validationErrors}
                >
                  <Input.Password placeholder="Confirm New Password" />
                </FormItem>
              </ResponsiveCol>
            </Row>
            <Row gutter={24} className="mt-2">
              <Col md={24}>
                <Space>
                  <Button type="primary" htmlType="submit" loading={false}>
                    Update
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
        </Row>
      </Card>
    </>
  );
}
