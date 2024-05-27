import { Card, Col, Row } from 'antd';

export default function DashboardIndex() {
  return (
    <Card>
      <Row className="mb-4">
        <Col span={24}>
          <h1>Dashboard</h1>
        </Col>
      </Row>
    </Card>
  );
}
