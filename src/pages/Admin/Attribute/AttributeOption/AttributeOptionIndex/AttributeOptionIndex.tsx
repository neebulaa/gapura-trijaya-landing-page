import usePageEffect from '@/commons/hooks/usePageEffect';
import useAttributeOptionIndexController from './AttributeOptionIndexController';
import { Breadcrumb, Button, Card, Col, Input, Row, Space, Table } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import ToggleableLink from '@/commons/utils/ToggleableLink';

export default function AttributeOptionIndex() {
  usePageEffect({
    index: false,
    title: `Attribute Options`,
    prevRoute: '/admin/attributes',
  });

  const {
    breadcrumbItem,
    AttributeOptionTableProps,
    // attributeId,
    attributeOptionData,
    attributeOptionDataIsFetching,
    attributeOptionDataRefetch,
    handleTableChange,
    handleSearch,
  } = useAttributeOptionIndexController();

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
              <Button type="primary" onClick={() => attributeOptionDataRefetch()}>
                <RedoOutlined spin={attributeOptionDataIsFetching} />
              </Button>
            </Space>
          </Col>
          <Col sm={6} md={6} className={'justify-end flex'}>
            <ToggleableLink to={'/admin/attributes/create'} disabled={false}>
              <Button type="primary" disabled={false}>
                Add Option
              </Button>
            </ToggleableLink>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              scroll={{ x: 700 }}
              bordered={true}
              size="small"
              rowKey={(record) => record.id!}
              columns={AttributeOptionTableProps}
              dataSource={attributeOptionData?.data}
              pagination={{
                total: attributeOptionData?.meta.total,
                current: attributeOptionData?.meta.currentPage,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
                size: 'default',
              }}
              onChange={handleTableChange}
              loading={attributeOptionDataIsFetching}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}
