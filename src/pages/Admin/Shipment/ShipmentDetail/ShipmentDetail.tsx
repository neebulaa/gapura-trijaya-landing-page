import usePageEffect from '@/commons/hooks/usePageEffect';
import { separator } from '@/commons/utils/Currency/Currency';
import useShipmentDetailController from '@/pages/Admin/Shipment/ShipmentDetail/ShipmentDetailController';
import { Breadcrumb, Card, Col, List, Row, Skeleton, Space, Table, Tag } from 'antd';
import dayjs from 'dayjs';

export default function ShipmentDetail() {
  /** Controller */
  const {
    breadcrumbItem,
    shipmentData,
    shipmentDataIsFetching,
    shipmentDataIsRefetch,
    OrderItemsTableProps,
  } = useShipmentDetailController();

  usePageEffect({
    index: false,
    title: `Shipment Detail`,
    prevRoute: -1,
  });

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Card title={`Shipment Detail`}>
        {shipmentDataIsFetching ? (
          <Skeleton />
        ) : (
          <>
            <Row gutter={24} className="mb-4">
              <Col xl={8} lg={8}>
                <p className="text-dark mb-2 text-primary uppercase font-medium text-base">
                  Billing Address
                </p>
                <address>
                  {shipmentData?.data?.order?.customerFirstName} {shipmentData?.data?.order?.customerLastName}
                  <br /> {shipmentData?.data?.order?.customerAddress1}
                  <br /> {shipmentData?.data?.order?.customerAddress2}
                  <br />
                  <span className="font-semibold">Email:</span> {shipmentData?.data?.order?.customerEmail}
                  <br />
                  <span className="font-semibold">Phone:</span> {shipmentData?.data?.order?.customerPhone}
                  <br />
                  <span className="font-semibold">Postcode:</span>{' '}
                  {shipmentData?.data?.order?.customerPostcode}
                </address>
              </Col>
              <Col xl={8} lg={8}>
                <p className="text-dark mb-2 text-primary uppercase font-semibold text-base">
                  Shipment Address
                </p>
                <address>
                  {shipmentData?.data?.order?.customerFullName}
                  <br /> {shipmentData?.data?.order?.customerAddress1}
                  <br /> {shipmentData?.data?.order?.customerAddress2}
                  <br />
                  <span className="font-semibold">Email:</span> {shipmentData?.data?.order?.customerEmail}
                  <br />
                  <span className="font-semibold">Phone:</span> {shipmentData?.data?.order?.customerPhone}
                  <br />
                  <span className="font-semibold">Postcode:</span>{' '}
                  {shipmentData?.data?.order?.customerPostcode}
                </address>
              </Col>
              <Col xl={8} lg={8}>
                <p className="text-dark mb-2 text-primary uppercase font-medium text-base">
                  Details
                </p>
                <address>
                  <span className="font-semibold">Invoice ID: </span>
                  <span className="font-semibold text-blue">#{shipmentData?.data?.order?.code}</span>
                  <br /> {dayjs(shipmentData?.data?.order?.orderDate).format('HH:mm:ss DD/MM/YYYY')}
                  <br /> <span className="font-semibold">Status:</span>
                  <Tag className="ml-2">{shipmentData?.data?.order?.status}</Tag>
                  <br /> <span className="font-semibold">Payment Status:</span>
                  <Tag color="yellow" className="ml-2">
                    {shipmentData?.data?.order?.paymentStatus}
                  </Tag>
                  <br /> <span className="font-semibold">Shipped by:</span>{' '}
                  <span className="font-semibold text-blue">
                    {shipmentData?.data?.order?.shippingServiceName}
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
                  dataSource={shipmentData?.data?.order?.orderItems}
                  pagination={false}
                />
              </Col>
            </Row>
            <Row gutter={24} className="mt-4">
              <Col span={8} offset={16}>
                <List className="cart-page-total">
                  <List.Item>
                    <Space>
                      Subtotal <span>Rp {separator(shipmentData?.data?.order?.baseTotalPrice)}</span>
                    </Space>
                  </List.Item>
                  {/* <List.Item>
                    <Space>
                      Tax (10%) <span>Rp {separator(shipmentData?.data?.order?.taxAmount)}</span>
                    </Space>
                  </List.Item> */}
                  <List.Item>
                    <Space>
                      Shipping Cost <span>Rp {separator(shipmentData?.data?.order?.shippingCost)}</span>
                    </Space>
                  </List.Item>
                  <List.Item className="font-semibold">
                    <Space>
                      Total <span>Rp {separator(shipmentData?.data?.order?.grandTotal)}</span>
                    </Space>
                  </List.Item>
                </List>
              </Col>
            </Row>
          </>
        )}
      </Card>
    </>
  );
}
