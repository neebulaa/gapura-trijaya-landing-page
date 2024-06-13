import ActionButton from '@/commons/components/Button/ActionButton';
import usePageEffect from '@/commons/hooks/usePageEffect';
import useOrderDetailController from '@/pages/Admin/Order/OrderDetail/OrderDetailController';
import { Breadcrumb, Button, Card, Col, List, Row, Skeleton, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';
import { OrderPaymentStatus } from '@/types/enum/order-status.enum.ts';

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
                <p
                  className="text-dark mb-2"
                  style={{ fontWeight: 'normal', fontSize: '16px', textTransform: 'uppercase' }}
                >
                  Billing Address
                </p>
                <address>
                  {orderData?.data?.customerFirstName} {orderData?.data?.customerLastName}
                  <br /> {orderData?.data?.customerAddress1}
                  <br /> {orderData?.data?.customerAddress2} <br />
                  <br /> Email: {orderData?.data?.customerEmail}
                  <br /> Phone: {orderData?.data?.customerPhone}
                  <br /> Postcode: {orderData?.data?.customerPostcode}
                </address>
              </Col>
              <Col xl={8} lg={8}>
                <p
                  className="text-dark mb-2"
                  style={{ fontWeight: 'normal', fontSize: '16px', textTransform: 'uppercase' }}
                >
                  Shipment Address
                </p>
                <address>
                  {orderData?.data?.customerFullName}
                  <br /> {orderData?.data?.customerAddress1}
                  <br /> {orderData?.data?.customerAddress2} <br />
                  <br /> Email: {orderData?.data?.customerEmail}
                  <br /> Phone: {orderData?.data?.customerPhone}
                  <br /> Postcode: {orderData?.data?.customerPostcode}
                </address>
              </Col>
              <Col xl={8} lg={8}>
                <p
                  className="text-dark mb-2"
                  style={{ fontWeight: 'normal', fontSize: '16px', textTransform: 'uppercase' }}
                >
                  Details
                </p>
                <address>
                  Invoice ID:{' '}
                  <span className="text-dark font-semibold">#{orderData?.data?.code}</span>
                  <br /> {dayjs(orderData?.data?.orderDate).format('HH:mm:ss DD/MM/YYYY')}
                  <br /> Status:
                  <Tag className="ml-2">{orderData?.data?.status}</Tag>
                  <br /> Payment Status:
                  <Tag color="yellow" className="ml-2">
                    {orderData?.data?.paymentStatus}
                  </Tag>
                  <br /> Shipped by:{' '}
                  <span className="font-medium">{orderData?.data?.shippingServiceName}</span>
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
                {/* <p
              className="text-dark mb-2"
              style={{ fontWeight: 'normal', fontSize: '16px', textTransform: 'uppercase' }}
            >
              Summary
            </p>
            <address>
              Base Total Price: {orderData?.data.baseTotalPrice}
              <br /> Tax Amount: {orderData?.data.taxAmount}
              <br /> Shipping Cost: {orderData?.data.shippingCost}
              <br /> Grand Total: {orderData?.data.grandTotal}
            </address> */}
                <List className="cart-page-total">
                  <List.Item>
                    <Space>
                      Subtotal <span>{orderData?.data.baseTotalPrice}</span>
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space>
                      Tax (10%) <span>{orderData?.data.taxAmount}</span>
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space>
                      Shipping Cost <span>{orderData?.data.shippingCost}</span>
                    </Space>
                  </List.Item>
                  <List.Item>
                    <Space>
                      Total <span>{orderData?.data.grandTotal}</span>
                    </Space>
                  </List.Item>
                </List>
              </Col>
            </Row>
            <Row gutter={24} className="mt-4">
              <Col span={8} offset={16}>
                {orderData?.data.paymentStatus === OrderPaymentStatus.PAID ? (
                  <>
                    <Button
                      type="primary"
                      // href={orderData?.data.paymentUrl}
                      target="_blank"
                      className="bg-primary shadow-none px-6 mt-2 w-full"
                    >
                      Proceed to shipment
                    </Button>
                  </>
                ) : null}
                <Button
                  type="primary"
                  // href={orderData?.data.paymentUrl}
                  target="_blank"
                  size="large"
                  className="rounded-full bg-primary shadow-none px-6 mt-2 w-full"
                >
                  Mark as Completed
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
}
