import usePageEffect from '@/commons/hooks/usePageEffect';
import ToggleableLink from '@/commons/utils/ToggleableLink';
import useProductIndexController from '@/pages/Admin/Product/ProductIndex/ProductIndexController';
import { RedoOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Input, Row, Space, Table } from 'antd';

export default function ProductIndex() {
  const {
    breadcrumbItem,
    handleSearch,
    productDataRefetch,
    productData,
    productDataIsFetching,
    ProductTableProps,
    handleTableChange,
  } = useProductIndexController();

  usePageEffect({
    index: true,
    title: `Product List`,
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
              <Button type="primary" onClick={() => productDataRefetch()}>
                <RedoOutlined spin={productDataIsFetching} />
              </Button>
            </Space>
          </Col>
          <Col sm={6} md={6} className={'justify-end flex'}>
            <ToggleableLink to={'/admin/products/create'} disabled={false}>
              <Button type="primary" disabled={false}>
                Add Product
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
              columns={ProductTableProps}
              dataSource={productData?.data}
              pagination={{
                total: productData?.meta.total,
                current: productData?.meta.currentPage,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
                size: 'default',
              }}
              onChange={handleTableChange}
              loading={productDataIsFetching}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}
