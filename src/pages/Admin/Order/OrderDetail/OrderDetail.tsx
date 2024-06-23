import usePageEffect from '@/commons/hooks/usePageEffect';
import { separator } from '@/commons/utils/Currency/Currency';
import ToggleableLink from '@/commons/utils/ToggleableLink';
import useOrderDetailController from '@/pages/Admin/Order/OrderDetail/OrderDetailController';
import { OrderPaymentStatus } from '@/types/enum/order-status.enum.ts';
import { CheckOutlined, CloseOutlined, CreditCardOutlined, EditOutlined } from '@ant-design/icons';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  List,
  Popconfirm,
  Row,
  Skeleton,
  Space,
  Table,
  Tag,
} from 'antd';
import dayjs from 'dayjs';

export default function OrderDetail() {
  /** Controller */
  const {
    breadcrumbItem,
    orderData,
    orderDataIsFetching,
    orderDataIsRefetch,
    OrderItemsTableProps,
    handleOrderCancel,
    handleOrderRemove,
    handleBypassPayment,
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
                  rowKey={(record) => record.id!}
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
                  {/* <List.Item>
                    <Space>
                      Tax (10%) <span>Rp {separator(orderData?.data?.taxAmount)}</span>
                    </Space>
                  </List.Item> */}
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
                {/* Mark as Cancel */}
                <Popconfirm
                  title="Bypass payment?"
                  onConfirm={handleBypassPayment}
                  placement="left"
                >
                  <Button
                    icon={<CreditCardOutlined />}
                    type="primary"
                    className="w-full shadow-none mt-2"
                    disabled={orderData?.data.paymentStatus === OrderPaymentStatus.PAID}
                  >
                    Bypass Payment (Development Only)
                  </Button>
                </Popconfirm>
                {/* IS PAID */}
                {/* {orderData?.data.paymentStatus === OrderPaymentStatus.PAID ? ( */}
                <ToggleableLink to={`/admin/shipments/${orderData?.data?.shipment!.id!}/edit`}>
                  <Button
                    icon={<EditOutlined />}
                    type="primary"
                    className="w-full shadow-none mt-2"
                    disabled={orderData?.data.paymentStatus !== OrderPaymentStatus.PAID}
                  >
                    Proceed to shipment
                  </Button>
                </ToggleableLink>
                {/* ) : null} */}
                {/* Mark as Completed */}
                <Popconfirm
                  title="Yakin menandai sebagai Completed?"
                  onConfirm={() => console.log('test')}
                  placement="left"
                >
                  <Button
                    icon={<CheckOutlined />}
                    type="primary"
                    className="w-full shadow-none mt-2"
                    disabled={true}
                  >
                    Mark as Completed
                  </Button>
                </Popconfirm>
                {/* Mark as Cancel */}
                <ToggleableLink to={`/admin/orders/${orderData?.data?.id!}/cancel`}>
                  <Button
                    icon={<CloseOutlined />}
                    type="default"
                    className="w-full shadow-none mt-2"
                    disabled={orderData?.data.paymentStatus === OrderPaymentStatus.PAID}
                  >
                    Cancel
                  </Button>
                </ToggleableLink>
                {/* <Popconfirm
                  title="Yakin untuk Remove?"
                  onConfirm={handleOrderRemove}
                  placement="left"
                >
                  <Button
                    icon={<DeleteOutlined />}
                    type="default"
                    className="w-full shadow-none mt-2"
                  >
                    Remove
                  </Button>
                </Popconfirm> */}
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
}
