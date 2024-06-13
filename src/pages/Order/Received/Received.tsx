import PageHeader from '@/commons/components/Layout/HomeLayout/PageHeader';
import { separator } from '@/commons/utils/Currency/Currency';
import useReceivedController from '@/pages/Order/Received/ReceivedController';
import { Button, Col, List, Row, Skeleton, Space, Table, Tag, Typography } from 'antd';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;

export default function Received() {
  const {
    orderData,
    orderDataIsFetching,
    orderDataIsRefetch,
    ReceivedOrderTableProps,
    orderItems,
  } = useReceivedController();

  return (
    <>
      <PageHeader
        title="Order Received"
        navigations={[
          { label: 'Home', link: '/' },
          { label: 'Order', link: '/order' },
          { label: 'Received' },
        ]}
      />
      <div className="container">
        {orderDataIsFetching ? (
          <Skeleton />
        ) : (
          <>
            {orderData?.data ? (
              <>
                <Title level={2} className="cart-heading">
                  <span className="text-primary">Your Order:</span>
                </Title>
                <Row gutter={16} className="mb-6">
                  <Col span={8}>
                    <Paragraph
                      className="text-dark mb-2 text-primary"
                      style={{ fontWeight: 'normal', fontSize: '16px', textTransform: 'uppercase' }}
                    >
                      Billing Address
                    </Paragraph>
                    <address>
                      {orderData.data.customerFirstName} {orderData.data.customerLastName}
                      <br /> {orderData.data.customerAddress1}
                      <br /> {orderData.data.customerAddress2} <br />
                      <br /> Email: {orderData.data.customerEmail}
                      <br /> Phone: {orderData.data.customerPhone}
                      <br /> Postcode: {orderData.data.customerPostcode}
                    </address>
                  </Col>
                  <Col span={8}>
                    <Paragraph
                      className="text-dark mb-2 "
                      style={{ fontWeight: 'normal', fontSize: '16px', textTransform: 'uppercase' }}
                    >
                      Shipment Address
                    </Paragraph>
                    <address>
                      {orderData.data.customerFirstName} {orderData.data.customerLastName}
                      <br /> {orderData.data.customerAddress1}
                      <br /> {orderData.data.customerAddress2} <br />
                      <br /> Email: {orderData.data.customerEmail}
                      <br /> Phone: {orderData.data.customerPhone}
                      <br /> Postcode: {orderData.data.customerPostcode}
                    </address>
                  </Col>
                  <Col span={8}>
                    <Paragraph
                      className="text-dark mb-2"
                      style={{ fontWeight: 'normal', fontSize: '16px', textTransform: 'uppercase' }}
                    >
                      Details
                    </Paragraph>
                    <address>
                      Invoice ID:{' '}
                      <span className="text-dark font-semibold">#{orderData.data.code}</span>
                      <br /> {dayjs(orderData.data.orderDate).format('HH:mm:ss DD/MM/YYYY')}
                      <br /> Status:
                      <Tag className="ml-2">{orderData.data.status}</Tag>
                      <br /> Payment Status:
                      <Tag color="yellow" className="ml-2">
                        {orderData.data.paymentStatus}
                      </Tag>
                      <br /> Shipped by: {orderData.data.shippingServiceName}
                    </address>
                  </Col>
                </Row>
                <Table
                  bordered={false}
                  className="table mt-3 table-striped w-full"
                  size="small"
                  columns={ReceivedOrderTableProps}
                  dataSource={orderItems}
                  pagination={false}
                />

                <Row>
                  <Col span={8} offset={16}>
                    <List className="cart-page-total">
                      <List.Item>
                        <Space>
                          Subtotal <span>Rp {separator(orderData.data.baseTotalPrice)}</span>
                        </Space>
                      </List.Item>
                      <List.Item>
                        <Space>
                          Tax (10%) <span>Rp {separator(orderData.data.taxAmount)}</span>
                        </Space>
                      </List.Item>
                      <List.Item>
                        <Space>
                          Shipping Cost <span>Rp {separator(orderData.data.shippingCost)}</span>
                        </Space>
                      </List.Item>
                      <List.Item className="font-semibold">
                        <Space>
                          Total <span>Rp {separator(orderData.data.grandTotal)}</span>
                        </Space>
                      </List.Item>
                    </List>
                    {/* {!orderData.data.isPaid && <a href={order.paymentUrl}>Proceed to payment</a>} */}
                    {orderData.data?.paymentStatus === 'unpaid' ? (
                      <Button
                        type="primary"
                        href={`#`}
                        target="_blank"
                        size="large"
                        className="rounded-full bg-primary shadow-none px-6 mt-2 w-full"
                      >
                        Proceed to payment
                      </Button>
                    ) : null}
                  </Col>
                </Row>
              </>
            ) : (
              <Title level={3} className="cart-heading flex justify-center">
                <span className="text-primary">No Order Received</span>
              </Title>
            )}
          </>
        )}
      </div>
    </>
  );
}
