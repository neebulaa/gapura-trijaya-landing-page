import usePageEffect from '@/commons/hooks/usePageEffect';
import useOrderIndexController from '@/pages/Admin/Order/OrderIndex/OrderIndexController';
import { IOrder } from '@/types/order';
import { FilterOutlined, RedoOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';

export default function OrderIndex() {
  /** Controller */
  const {
    breadcrumbItem,
    filterForm,
    handleSearch,
    orderData,
    OrderTableProps,
    isFilterVisible,
    setIsFilterVisible,
    handleToggleFilter,
    handleFilter,
    resetFilter,
  } = useOrderIndexController();

  usePageEffect({
    index: true,
    title: `Order List`,
  });

  const { RangePicker } = DatePicker;
  const { Option } = Select;

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Card>
        <Row className="mb-4">
          <Col md={6} sm={4}>
            <Input placeholder="Search" onChange={(e) => console.log(e.target.value)} />
          </Col>
          <Col md={12} className="px-2">
            <Space>
              <Button type="primary" onClick={() => console.log('search')}>
                <RedoOutlined spin={false} />
              </Button>
              {/* bikin tombol trigger muncul filter disini */}
              <Tooltip title="Filter" placement="right">
                <Button type="primary" onClick={handleToggleFilter}>
                  <FilterOutlined />
                </Button>
              </Tooltip>
            </Space>
          </Col>
          {/* <Col sm={6} md={6} className={'justify-end flex'}>
            <ToggleableLink to={'/admin/orders/create'} disabled={false}>
              <Button type="primary" disabled={false}>
                Add Category
              </Button>
            </ToggleableLink>
          </Col> */}
        </Row>
        {isFilterVisible && (
          <Row className="mb-4 transition-max-height ease-in-out duration-300 max-h-screen">
            <Col span={24}>
              <Card>
                <Form
                  form={filterForm}
                  layout="inline"
                  onFinish={handleSearch}
                  style={{ width: '100%' }}
                >
                  <Form.Item name="q">
                    <Input placeholder="Type code or name" />
                  </Form.Item>
                  <Form.Item name="dateRange">
                    <RangePicker format="YYYY-MM-DD" />
                  </Form.Item>
                  <Form.Item name="status">
                    <Select placeholder="All Status" style={{ width: 120 }}>
                      <Option value="Pending">Pending</Option>
                      <Option value="Completed">Completed</Option>
                      <Option value="Cancelled">Cancelled</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <Button type="default" onClick={resetFilter}>
                        Reset
                      </Button>
                      <Button type="primary" htmlType="submit" onClick={handleFilter}>
                        Filter
                      </Button>
                    </Space>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
        )}
        <Row>
          <Col span={24}>
            <Table
              scroll={{ x: 700 }}
              bordered={true}
              size="small"
              rowKey={(record) => record.id!}
              columns={OrderTableProps}
              dataSource={(orderData?.data as IOrder[]) || []}
              //   pagination={{
              //     total: categoryData?.meta.total,
              //     current: categoryData?.meta.currentPage,
              //     showSizeChanger: true,
              //     showTotal: (total) => `Total ${total} items`,
              //     size: 'default',
              //   }}
              //   onChange={handleTableChange}
              //   loading={categoryDataIsFetching}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}
