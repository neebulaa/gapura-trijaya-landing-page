import { Breadcrumb, Button, Card, Col, Input, Row, Space, Table } from 'antd';
import useCategoryIndexController from '@/pages/Admin/Category/CategoryIndex/CategoryIndexController';
import { RedoOutlined } from '@ant-design/icons';
import ToggleableLink from '@/commons/utils/ToggleableLink';
import usePageEffect from '@/commons/hooks/usePageEffect';

export default function CategoryIndex() {
  const {
    breadcrumbItem,
    handleSearch,
    categoryDataRefetch,
    categoryData,
    categoryDataIsFetching,
    CategoryTableProps,
    handleTableChange
  } = useCategoryIndexController();

  usePageEffect({
    index: true,
    title: `Category List`,
  });

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Card>
        <Row className="mb-4">
          <Col md={6} sm={4}>
            <Input
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Col>
          <Col md={12} className="px-2">
            <Space>
              <Button type="primary" onClick={() => categoryDataRefetch()}>
                <RedoOutlined spin={categoryDataIsFetching} />
              </Button>
            </Space>
          </Col>
          <Col sm={6} md={6} className={'justify-end flex'}>
            <ToggleableLink to={'/admin/categories/create'} disabled={false}>
              <Button type="primary" disabled={false}>
                Add Category
              </Button>
            </ToggleableLink>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              scroll={{ x: 1300 }}
              bordered={true}
              size="small"
              rowKey={(record) => record.id!}
              columns={CategoryTableProps}
              dataSource={categoryData?.data}
              pagination={{
                total: categoryData?.meta.total,
                current: categoryData?.meta.currentPage,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
                size: 'default',
              }}
              onChange={handleTableChange}
              loading={categoryDataIsFetching}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}
