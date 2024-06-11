import ActionButton from '@/commons/components/Button/ActionButton';
import usePageEffect from '@/commons/hooks/usePageEffect';
import useOrderDetailController from '@/pages/Admin/Order/OrderDetail/OrderDetailController';
import { Breadcrumb, Button, Card, Col, List, Row, Space, Table } from 'antd';

export default function OrderDetail() {
  /** Controller */
  const { breadcrumbItem, orderDetail, OrderItemsTableProps } = useOrderDetailController();

  usePageEffect({
    index: false,
    title: `Show Order Detail`,
    prevRoute: -1,
  });

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Card title={`Order Detail`}>
        <Row gutter={24} className="mb-4">
          <Col xl={8} lg={8}>
            <p
              className="text-dark mb-2"
              style={{ fontWeight: 'normal', fontSize: '16px', textTransform: 'uppercase' }}
            >
              Billing Address
            </p>
            <address>
              {orderDetail.customerFirstName} {orderDetail.customerLastName}
              <br /> {orderDetail.customerAddress1}
              <br /> {orderDetail.customerAddress2}
              <br /> Email: {orderDetail.customerEmail}
              <br /> Phone: {orderDetail.customerPhone}
              <br /> Postcode: {orderDetail.customerPostcode}
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
              {orderDetail.shipment.firstName} {orderDetail.shipment.lastName}
              <br /> {orderDetail.shipment.address1}
              <br /> {orderDetail.shipment.address2}
              <br /> Email: {orderDetail.shipment.email}
              <br /> Phone: {orderDetail.shipment.phone}
              <br /> Postcode: {orderDetail.shipment.postcode}
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
              Invoice ID: <span className="text-dark">#{orderDetail.code}</span>
              <br /> {orderDetail.orderDate}
              <br /> Status: {orderDetail.status}
              {orderDetail.isCancelled ? `(${orderDetail.cancelledAt})` : null}
              {orderDetail.isCancelled && <br />}Cancellation Note: {orderDetail.cancellationNote}
              <br /> Payment Status: {orderDetail.paymentStatus}
              <br /> Shipped by: {orderDetail.shippingServiceName}
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
              dataSource={orderDetail.orderItems}
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
              Base Total Price: {orderDetail.baseTotalPrice}
              <br /> Tax Amount: {orderDetail.taxAmount}
              <br /> Shipping Cost: {orderDetail.shippingCost}
              <br /> Grand Total: {orderDetail.grandTotal}
            </address> */}
            <List className="cart-page-total">
              <List.Item>
                <Space>
                  Subtotal <span>{orderDetail.baseTotalPrice}</span>
                </Space>
              </List.Item>
              <List.Item>
                <Space>
                  Tax (10%) <span>{orderDetail.taxAmount}</span>
                </Space>
              </List.Item>
              <List.Item>
                <Space>
                  Shipping Cost <span>{orderDetail.shippingCost}</span>
                </Space>
              </List.Item>
              <List.Item>
                <Space>
                  Total <span>{orderDetail.grandTotal}</span>
                </Space>
              </List.Item>
            </List>
          </Col>
        </Row>
        <Row gutter={24} className="mt-4">
          <Col span={8} offset={16}>
            {!orderDetail.isPaid && (
              <>
                <Button
                  type="primary"
                  href={orderDetail.paymentUrl}
                  target="_blank"
                  size="large"
                  className="rounded-full bg-primary shadow-none px-6 mt-2 w-full"
                >
                  Proceed to shipment
                </Button>
                <Button
                  type="primary"
                  href={orderDetail.paymentUrl}
                  target="_blank"
                  size="large"
                  className="rounded-full bg-primary shadow-none px-6 mt-2 w-full"
                >
                  Mark as Completed
                </Button>
                <ActionButton
                  //   icon={<EyeOutlined />}
                  hoverMessage="Show"
                  status="success"
                  type="default"
                  className="w-full"
                >
                  Cancel
                </ActionButton>
              </>
            )}
          </Col>
        </Row>
      </Card>
    </>
  );
}
