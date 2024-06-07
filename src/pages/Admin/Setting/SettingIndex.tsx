import usePageEffect from '@/commons/hooks/usePageEffect';
import useSettingIndexController from '@/pages/Admin/Setting/SettingIndexController';
import { Breadcrumb, Card, Col, Row } from 'antd';

export default function SettingIndex() {
  const { breadcrumbItem } = useSettingIndexController();

  usePageEffect({
    index: true,
    title: `Setting`,
  });

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Card>
        <Row className="mb-4">
          <Col md={6} sm={4}>
            <span>Setting</span>
          </Col>
        </Row>
      </Card>
    </>
  );
}
