import FormItem from '@/commons/components/Form/FormItem';
import usePageEffect from '@/commons/hooks/usePageEffect';
import { separator } from '@/commons/utils/Currency/Currency';
import OrderPaymentStatusNode from '@/pages/Admin/Order/components/reusable/OrderPaymentStatusNode';
import OrderStatusNode from '@/pages/Admin/Order/components/reusable/OrderStatusNode';
import useShipmentFormController from '@/pages/Admin/Shipment/ShipmentForm/ShipmentFormController';
import { FormType, IFormProps } from '@/types/global/form';
import { Breadcrumb, Button, Card, Col, Form, Input, Row, Select, Space, Table } from 'antd';
import dayjs from 'dayjs';

export default function ShipmentForm(props: IFormProps) {
  const { formType } = props;

  /** Controller */
  const {
    breadcrumbItem,
    shipmentData,
    shipmentDataIsFetching,
    shipmentDataIsError,
    ShipmentOrderItemsTableProps,
    form,
    handleFormSubmit,
    mutateUpdateShipmentIsLoading,
    validationErrors,
  } = useShipmentFormController(props);

  usePageEffect({
    index: false,
    title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Shipment`,
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
                <span className="text-black">Order Shipment </span>
                <span className="text-blue">#{shipmentData?.data?.order?.code}</span>
              </>
            }
            bordered
          >
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
              {/* <Form.Item name="id" hidden>
                <Input />
              </Form.Item> */}
              <Row gutter={16}>
                <Col md={12}>
                  <Form.Item name="firstName" label="First name">
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="lastName" label="Last name">
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="address1" label="Home number and street name">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="address2" label="Apartment, suite, unit etc. (optional)">
                <Input readOnly />
              </Form.Item>
              <Form.Item name="provinceId" label="Province">
                <Select disabled>
                  {/* {provinces.map((province) => (
                    <Option key={province.id} value={province.id}>
                      {province.name}
                    </Option>
                  ))} */}
                </Select>
              </Form.Item>
              <Row gutter={16}>
                <Col md={12}>
                  <Form.Item name="cityId" label="City">
                    <Select disabled>
                      {/* {cities.map((city) => (
                        <Option key={city.id} value={city.id}>
                          {city.name}
                        </Option>
                      ))} */}
                    </Select>
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="postcode" label="Postcode / zip">
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col md={12}>
                  <Form.Item name="phone" label="Phone">
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="email" label="Email">
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col md={12}>
                  <Form.Item name="totalQty" label="Quantity">
                    <Input readOnly />
                  </Form.Item>
                </Col>
                <Col md={12}>
                  <Form.Item name="totalWeight" label="Total Weight (gram)">
                    <Input readOnly />
                  </Form.Item>
                </Col>
              </Row>
              <FormItem
                name="trackNumber"
                label="Track Number"
                className="font-medium"
                rules={[{ required: false }]}
                validationErrors={validationErrors}
              >
                <Input placeholder="Track Number/RESI" />
              </FormItem>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={mutateUpdateShipmentIsLoading}>
                    Save
                  </Button>
                  <Button
                    type="default"
                    href={`/admin/orders/${shipmentData?.data?.order!.id}/show`}
                  >
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
                  {shipmentData?.data?.order?.customerFirstName}{' '}
                  {shipmentData?.data?.order?.customerLastName}
                  <br /> {shipmentData?.data?.order?.customerAddress1}
                  <br /> {shipmentData?.data?.order?.customerAddress2}
                  <br />
                  <span className="font-semibold">Email:</span>{' '}
                  {shipmentData?.data?.order?.customerEmail}
                  <br />
                  <span className="font-semibold">Phone:</span>{' '}
                  {shipmentData?.data?.order?.customerPhone}
                  <br />
                  <span className="font-semibold">Postcode:</span>{' '}
                  {shipmentData?.data?.order?.customerPostcode}
                </address>
              </Col>
              <Col xl={12} lg={12}>
                <p className="text-dark mb-2 text-primary uppercase font-medium text-base">
                  Details
                </p>
                <address>
                  <span className="font-semibold">Invoice ID: </span>
                  <span className="font-semibold text-blue">
                    #{shipmentData?.data?.order?.code}
                  </span>
                  <br /> {dayjs(shipmentData?.data?.order?.orderDate).format('HH:mm:ss DD/MM/YYYY')}
                  <br />
                  <span className="font-semibold me-2">Status: </span>
                  {/* <Tag className="ml-2">{shipmentData?.data?.order?.status}</Tag> */}
                  <OrderStatusNode status={shipmentData?.data?.order?.status} />
                  <br />
                  <span className="font-semibold me-2">Payment Status: </span>
                  {/* <Tag color="yellow" className="ml-2">
                    {shipmentData?.data?.order?.paymentStatus}
                  </Tag> */}
                  <OrderPaymentStatusNode status={shipmentData?.data?.order?.paymentStatus} />
                  <br /> <span className="font-semibold">Shipped by:</span>{' '}
                  <span className="font-semibold text-blue">
                    {shipmentData?.data?.order?.shippingServiceName}
                  </span>
                </address>
              </Col>
            </Row>
            <Table
              rowKey={(record) => record.id!}
              dataSource={shipmentData?.data?.order.orderItems}
              columns={ShipmentOrderItemsTableProps}
            />
            <div className="row justify-content-end">
              <div className="col-lg-5 col-xl-6 col-xl-3 ml-sm-auto">
                <ul className="list-unstyled mt-4">
                  <li className="mid pb-3 text-dark">
                    Subtotal
                    <span className="d-inline-block float-right text-default">
                      Rp {separator(shipmentData?.data?.order?.baseTotalPrice)}
                    </span>
                  </li>
                  <li className="mid pb-3 text-dark">
                    Tax(10%)
                    <span className="d-inline-block float-right text-default">
                      Rp {separator(shipmentData?.data?.order?.taxAmount)}
                    </span>
                  </li>
                  <li className="mid pb-3 text-dark">
                    Shipping Cost
                    <span className="d-inline-block float-right text-default">
                      Rp {separator(shipmentData?.data?.order?.shippingCost)}
                    </span>
                  </li>
                  <li className="pb-3 text-dark font-semibold">
                    Total
                    <span className="d-inline-block float-right">
                      Rp {separator(shipmentData?.data?.order?.grandTotal)}
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
