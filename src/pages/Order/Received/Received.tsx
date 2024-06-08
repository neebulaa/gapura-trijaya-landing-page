import PageHeader from '@/commons/components/Layout/HomeLayout/PageHeader';
import useReceivedController from '@/pages/Order/Received/ReceivedController';
import { Button, Col, List, Row, Space, Table, Typography } from 'antd';

const { Title, Paragraph } = Typography;

export default function Received() {
  const { columns, order, orderItems } = useReceivedController();

  return (
    <>
      <PageHeader title="Order Received" navigations={['Home', 'Order', 'Received']} />
      <div className="container">
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
              {order.customerFirstName} {order.customerLastName}
              <br /> {order.customerAddress1}
              <br /> {order.customerAddress2} <br />
              <br /> Email: {order.customerEmail}
              <br /> Phone: {order.customerPhone}
              <br /> Postcode: {order.customerPostcode}
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
              {order.shipment.firstName} {order.shipment.lastName}
              <br /> {order.shipment.address1}
              <br /> {order.shipment.address2} <br />
              <br /> Email: {order.shipment.email}
              <br /> Phone: {order.shipment.phone}
              <br /> Postcode: {order.shipment.postcode}
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
              Invoice ID: <span className="text-dark">#{order.code}</span>
              <br /> {order.orderDate}
              <br /> Status: {order.status}
              <br /> Payment Status: {order.paymentStatus}
              <br /> Shipped by: {order.shippingServiceName}
            </address>
          </Col>
        </Row>
        <Table
          bordered={false}
          className="table mt-3 table-striped w-full"
          size="small"
          columns={columns}
          dataSource={orderItems}
          pagination={false}
        />

        <Row>
          <Col span={8} offset={16}>
            <List className="cart-page-total">
              <List.Item>
                <Space>
                  Subtotal <span>{order.baseTotalPrice}</span>
                </Space>
              </List.Item>
              <List.Item>
                <Space>
                  Tax (10%) <span>{order.taxAmount}</span>
                </Space>
              </List.Item>
              <List.Item>
                <Space>
                  Shipping Cost <span>{order.shippingCost}</span>
                </Space>
              </List.Item>
              <List.Item>
                <Space>
                  Total <span>{order.grandTotal}</span>
                </Space>
              </List.Item>
            </List>
            {/* {!order.isPaid && <a href={order.paymentUrl}>Proceed to payment</a>} */}
            {!order.isPaid && (
              <Button
                type="primary"
                href={order.paymentUrl}
                target="_blank"
                size="large"
                className="rounded-full bg-primary shadow-none px-6 mt-2 w-full"
              >
                Proceed to payment
              </Button>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}
