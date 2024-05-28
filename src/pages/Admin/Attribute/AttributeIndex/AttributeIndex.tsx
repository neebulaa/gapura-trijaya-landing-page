import { Breadcrumb, Button, Card, Col, Input, Row, Space, Table } from 'antd';
import useAttributeIndexController from '@/pages/Admin/Attribute/AttributeIndex/AttributeIndexController';
import { RedoOutlined } from '@ant-design/icons';
import ToggleableLink from '@/commons/utils/ToggleableLink';
import usePageEffect from '@/commons/hooks/usePageEffect';

export default function AttributeIndex() {
  const {
    breadcrumbItem,
    handleSearch,
    attributeDataRefetch,
    attributeData,
    attributeDataIsFetching,
    AttributeTableProps,
    handleTableChange,
  } = useAttributeIndexController();

  usePageEffect({
    index: true,
    title: `Attribute List`,
  });

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Card>
        <Row className="mb-4">
          <Col md={6} sm={4}>
            <Input placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
          </Col>
          <Col md={12} className="px-2">
            <Space>
              <Button type="primary" onClick={() => attributeDataRefetch()}>
                <RedoOutlined spin={attributeDataIsFetching} />
              </Button>
            </Space>
          </Col>
          <Col sm={6} md={6} className={'justify-end flex'}>
            <ToggleableLink to={'/admin/attributes/create'} disabled={false}>
              <Button type="primary" disabled={false}>
                Add Attribute
              </Button>
            </ToggleableLink>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              scroll={{ x: 700}}
              bordered={true}
              size="small"
              rowKey={(record) => record.id!}
              columns={AttributeTableProps}
              dataSource={attributeData?.data}
              pagination={{
                total: attributeData?.meta.total,
                current: attributeData?.meta.currentPage,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
                size: 'default',
              }}
              onChange={handleTableChange}
              loading={attributeDataIsFetching}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}
