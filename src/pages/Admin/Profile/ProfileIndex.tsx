import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import { Button, Card, Col, Form, Input, Row, Space } from 'antd';

export default function ProfileIndex() {
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
            <Row gutter={24}>
              <ResponsiveCol span={24} md={24}>
                <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                  <Input placeholder="Name" className="w-full" />
                </Form.Item>
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
