import FormItem from '@/commons/components/Form/FormItem';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import usePageEffect from '@/commons/hooks/usePageEffect';
import { Button, Card, Col, Divider, Form, Input, Row, Space } from 'antd';

export default function ProfileIndex() {
  usePageEffect({
    index: true,
    title: `Profile`,
  });

  return (
    <>
      <Card>
        <Row>
          <Form autoComplete="off" layout="vertical" className="w-full">
            <Row gutter={24}>
              <ResponsiveCol span={24} md={24}>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                  <Input placeholder="Name" className="w-full" />
                </Form.Item>
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
                  rules={[{ required: true }]}
                  // validationErrors={validationErrors}
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
                  rules={[{ required: true }]}
                  // validationErrors={validationErrors}
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
                  rules={[{ required: true }]}
                  // validationErrors={validationErrors}
                >
                  <Input.Password placeholder="Confirm New Password" />
                </FormItem>
              </ResponsiveCol>
            </Row>
            <Row gutter={24} className="mt-2">
              <Col md={24}>
                <Space>
                  <Button type="primary" onClick={() => console.log('submit')} loading={false}>
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
