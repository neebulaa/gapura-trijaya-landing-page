import FormItem from '@/commons/components/Form/FormItem';
import usePageEffect from '@/commons/hooks/usePageEffect';
import { separator } from '@/commons/utils/Currency/Currency';
import useOrderCancelController from '@/pages/Admin/Order/OrderCancel/OrderCancelController';
import OrderPaymentStatusNode from '@/pages/Admin/Order/components/reusable/OrderPaymentStatusNode';
import OrderStatusNode from '@/pages/Admin/Order/components/reusable/OrderStatusNode';
import { OrderStatus } from '@/types/enum/order-status.enum';
import { Breadcrumb, Button, Card, Col, Form, Input, Row, Space, Table } from 'antd';
import dayjs from 'dayjs';

export default function OrderCancel() {
  const {
    breadcrumbItem,
    form,
    validationErrors,
    orderData,
    orderDataIsFetching,
    orderDataIsRefetch,
    OrderItemsTableProps,
    handleFormSubmit,
  } = useOrderCancelController();

  usePageEffect({
    index: false,
    title: `Cancel Order`,
    prevRoute: -1,
  });

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Row gutter={10}>
        <Col lg={12}>
          <Card
            title={
              <>
                <span className="text-black">Cancel Order </span>
                <span className="text-blue">#{orderData?.data?.code}</span>
              </>
            }
            bordered
          >
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
              <FormItem
                name="cancellationNote"
                label="Cancellation Note"
                className="font-medium"
                rules={[{ required: false }]}
                validationErrors={validationErrors}
              >
                <Input.TextArea placeholder="Cancellation Note" rows={5} />
              </FormItem>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={false}>
                    Save
                  </Button>
                  <Button type="default" href={`/admin/orders/${orderData?.data?.id}/show`}>
                    Back
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col lg={12}>
          <Card title="Detail Order" bordered>
            <Row>
              <Col xl={12} lg={12}>
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
              <Col xl={12} lg={12}>
                <p className="text-dark mb-2 text-primary uppercase font-medium text-base">
                  Details
                </p>
                <address>
                  <span className="font-semibold">Invoice ID: </span>
                  <span className="font-semibold text-blue">#{orderData?.data?.code}</span>
                  <br /> {dayjs(orderData?.data?.orderDate).format('HH:mm:ss DD/MM/YYYY')}
                  <br />
                  <span className="font-semibold me-2">Status: </span>
                  {/* <Tag className="ml-2">{orderData?.data?.status}</Tag> */}
                  <OrderStatusNode status={orderData?.data?.status} />
                  <br />
                  <span className="font-semibold me-2">Payment Status: </span>
                  {/* <Tag color="yellow" className="ml-2">
                    {orderData?.data?.paymentStatus}
                  </Tag> */}
                  <OrderPaymentStatusNode status={orderData?.data?.paymentStatus} />
                  <br /> <span className="font-semibold">Shipped by:</span>{' '}
                  <span className="font-semibold text-blue">
                    {orderData?.data?.shippingServiceName}
                  </span>
                </address>
              </Col>
            </Row>
            <Table
              rowKey={(record) => record.id!}
              dataSource={orderData?.data?.orderItems}
              columns={OrderItemsTableProps}
            />
            <div className="row justify-content-end">
              <div className="col-lg-5 col-xl-6 col-xl-3 ml-sm-auto">
                <ul className="list-unstyled mt-4">
                  <li className="mid pb-3 text-dark">
                    Subtotal
                    <span className="d-inline-block float-right text-default">
                      Rp {separator(orderData?.data?.baseTotalPrice)}
                    </span>
                  </li>
                  {/* <li className="mid pb-3 text-dark">
                    Tax(10%)
                    <span className="d-inline-block float-right text-default">
                      Rp {separator(orderData?.data?.taxAmount)}
                    </span>
                  </li> */}
                  <li className="mid pb-3 text-dark">
                    Shipping Cost
                    <span className="d-inline-block float-right text-default">
                      Rp {separator(orderData?.data?.shippingCost)}
                    </span>
                  </li>
                  <li className="pb-3 text-dark font-semibold">
                    Total
                    <span className="d-inline-block float-right">
                      Rp {separator(orderData?.data?.grandTotal)}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
}
