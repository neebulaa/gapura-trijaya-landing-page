import usePageEffect from '@/commons/hooks/usePageEffect';
import useUserIndexController from '@/pages/Admin/User/UserIndex/UserIndexController';
import { RedoOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Input, Row, Space, Table } from 'antd';

export default function UserIndex() {
  /** Controller */
  const {
    breadcrumbItem,
    userData,
    userDataIsFetching,
    userDataRefetch,
    UserTableProps,
    handleTableChange,
    handleSearch,
  } = useUserIndexController();

  usePageEffect({
    index: true,
    title: `User List`,
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
              <Button type="primary" onClick={() => userDataRefetch()}>
                <RedoOutlined spin={userDataIsFetching} />
              </Button>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              scroll={{ x: 700 }}
              bordered={true}
              size="small"
              rowKey={(record) => record.id!}
              columns={UserTableProps}
              dataSource={userData?.data}
              pagination={{
                total: userData?.meta.total,
                current: userData?.meta.currentPage,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
                size: 'default',
              }}
              onChange={handleTableChange}
              loading={userDataIsFetching}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}
