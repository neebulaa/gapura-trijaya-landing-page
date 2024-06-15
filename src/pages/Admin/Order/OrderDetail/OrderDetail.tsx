import ActionButton from '@/commons/components/Button/ActionButton';
import usePageEffect from '@/commons/hooks/usePageEffect';
import useOrderDetailController from '@/pages/Admin/Order/OrderDetail/OrderDetailController';
import { Breadcrumb, Button, Card, Col, List, Row, Skeleton, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { OrderPaymentStatus } from '@/types/enum/order-status.enum.ts';
import { separator } from '@/commons/utils/Currency/Currency';
import { EditOutlined } from '@ant-design/icons';
import ToggleableLink from '@/commons/utils/ToggleableLink';

export default function OrderDetail() {
  /** Controller */
  const {
    breadcrumbItem,
    orderData,
    orderDataIsFetching,
    orderDataIsRefetch,
    OrderItemsTableProps,
  } = useOrderDetailController();

  usePageEffect({
    index: false,
    title: `Show Order Detail`,
    prevRoute: -1,
  });

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Card title={`Order Detail`}>
        {orderDataIsFetching ? (
          <Skeleton />
        ) : (
          <>
            <Row gutter={24} className="mb-4">
              <Col xl={8} lg={8}>
                <p className="text-dark mb-2 text-primary uppercase font-medium text-base">
                  Billing Address
                </p>
                <address>
                  {orderData?.data?.customerFirstName} {orderData?.data?.customerLastName}
                  <br /> {orderData?.data?.customerAddress1}
                  <br /> {orderData?.data?.customerAddress2}
                  <br />
                  <span className="font-semibold">Email:</span> {orderData?.data?.customerEmail}
                  <br />
                  <span className="font-semibold">Phone:</span> {orderData?.data?.customerPhone}
                  <br />
                  <span className="font-semibold">Postcode:</span>{' '}
                  {orderData?.data?.customerPostcode}
                </address>
              </Col>
              <Col xl={8} lg={8}>
                <p className="text-dark mb-2 text-primary uppercase font-semibold text-base">
                  Shipment Address
                </p>
                <address>
                  {orderData?.data?.customerFullName}
                  <br /> {orderData?.data?.customerAddress1}
                  <br /> {orderData?.data?.customerAddress2}
                  <br />
                  <span className="font-semibold">Email:</span> {orderData?.data?.customerEmail}
                  <br />
                  <span className="font-semibold">Phone:</span> {orderData?.data?.customerPhone}
                  <br />
                  <span className="font-semibold">Postcode:</span>{' '}
                  {orderData?.data?.customerPostcode}
                </address>
              </Col>
              <Col xl={8} lg={8}>
                <p className="text-dark mb-2 text-primary uppercase font-medium text-base">
                  Details
                </p>
                <address>
                  <span className="font-semibold">Invoice ID: </span>
                  <span className="font-semibold text-blue">#{orderData?.data?.code}</span>
                  <br /> {dayjs(orderData?.data?.orderDate).format('HH:mm:ss DD/MM/YYYY')}
                  <br /> <span className="font-semibold">Status:</span>
                  <Tag className="ml-2">{orderData?.data?.status}</Tag>
                  <br /> <span className="font-semibold">Payment Status:</span>
                  <Tag color="yellow" className="ml-2">
                    {orderData?.data?.paymentStatus}
                  </Tag>
                  <br /> <span className="font-semibold">Shipped by:</span>{' '}
                  <span className="font-semibold text-blue">
                    {orderData?.data?.shippingServiceName}
                  </span>
                </address>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24}>
                <Table
                  scroll={{ x: 700 }}
                  bordered={true}
                  size="small"
                  columns={OrderItemsTableProps}
                  dataSource={orderData?.data.orderItems}
                  pagination={false}
                />
              </Col>
            </Row>
            <Row gutter={24} className="mt-4">
              <Col span={8} offset={16}>
                <List className="cart-page-total">
                  <List.Item>
                    <Space>
                      Subtotal <span>Rp {separator(orderData?.data?.baseTotalPrice)}</span>
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space>
                      Tax (10%) <span>Rp {separator(orderData?.data?.taxAmount)}</span>
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space>
                      Shipping Cost <span>Rp {separator(orderData?.data?.shippingCost)}</span>
                    </Space>
                  </List.Item>
                  <List.Item className="font-semibold">
                    <Space>
                      Total <span>Rp {separator(orderData?.data?.grandTotal)}</span>
                    </Space>
                  </List.Item>
                </List>
              </Col>
            </Row>
            <Row gutter={24} className="mt-4">
              <Col span={8} offset={16}>
                {/* IS PAID */}
                {orderData?.data.paymentStatus === OrderPaymentStatus.PAID ? (
                  <ToggleableLink to={`/admin/shipments/${orderData?.data?.shipment!.id!}/edit`}>
                    <Button icon={<EditOutlined />} type="primary" className="w-full shadow-none">
                      Proceed to shipment
                    </Button>
                  </ToggleableLink>
                ) : null}
                <Button type="primary" target="_blank" className="shadow-none mt-2 w-full">
                  Mark as Completed
                </Button>
                <Button type="default" target="_blank" className="shadow-none mt-2 w-full">
                  Cancel
                </Button>
                <Button type="default" target="_blank" className="shadow-none mt-2 w-full">
                  Remove
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
}
