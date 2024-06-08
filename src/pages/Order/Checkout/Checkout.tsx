import FormItem from '@/commons/components/Form/FormItem';
import PageHeader from '@/commons/components/Layout/HomeLayout/PageHeader';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import useCheckoutController from '@/pages/Order/Checkout/CheckoutController';
import { Button, Card, Col, Divider, Form, Input, Row, Select, Steps } from 'antd';

const { Option } = Select;

export default function Checkout() {
  /** Controller */
  const {
    currentStep,
    buttonPlaceOrderDisabled,
    nextStep,
    prevStep,
    form,
    handlePlaceOrder,
    //
  } = useCheckoutController();

  const steps = [
    {
      title: 'Billing Information',
      content: (
        <>
          <Row gutter={10}>
            <ResponsiveCol span={24} md={12}>
              <FormItem
                label="First Name"
                name="firstName"
                className="font-normal"
                rules={[{ required: true }]}
                // validationErrors={validationErrors}
              >
                <Input placeholder="First Name" size="large" />
              </FormItem>
            </ResponsiveCol>
            <ResponsiveCol span={24} md={12}>
              <FormItem
                label="Last Name"
                name="lastName"
                className="font-normal"
                rules={[{ required: true }]}
                // validationErrors={validationErrors}
              >
                <Input placeholder="Last Name" size="large" />
              </FormItem>
            </ResponsiveCol>
          </Row>
          <Row gutter={10}>
            <ResponsiveCol span={24} md={12}>
              <FormItem
                label="Email"
                name="email"
                className="font-normal"
                rules={[
                  {
                    required: true,
                    type: 'email',
                    message: 'Please input a valid email',
                  },
                ]}
                // validationErrors={validationErrors}
              >
                <Input placeholder="Email" size="large" />
              </FormItem>
            </ResponsiveCol>
            <ResponsiveCol span={24} md={12}>
              <FormItem
                label="Phone Number (Whatsapp)"
                name="phone"
                className="font-normal"
                rules={[{ required: true }]}
                // validationErrors={validationErrors}
              >
                <Input addonBefore={`+62`} placeholder="Phone" size="large" />
              </FormItem>
            </ResponsiveCol>
          </Row>
          <Row>
            <ResponsiveCol span={24} md={24}>
              <FormItem
                label="Note"
                name="note"
                className="font-normal"
                rules={[{ required: false }]}
                // validationErrors={validationErrors}
              >
                <Input.TextArea placeholder="Note" size="large" rows={3} />
              </FormItem>
            </ResponsiveCol>
          </Row>
        </>
      ),
    },
    {
      title: 'Shipping Delivery',
      content: (
        <>
          <Row gutter={10}>
            <ResponsiveCol span={24} md={24}>
              <FormItem
                label="Address"
                name="address1"
                className="font-normal"
                rules={[{ required: true }]}
                // validationErrors={validationErrors}
              >
                <Input placeholder="Address" size="large" />
              </FormItem>
            </ResponsiveCol>
          </Row>
          <Row gutter={10}>
            <ResponsiveCol span={24} md={24}>
              <FormItem
                label={``}
                name="address2"
                className="font-normal"
                rules={[{ required: false }]}
                // validationErrors={validationErrors}
              >
                <Input placeholder="Appartment, suite, unit etc. (Optional)" size="large" />
              </FormItem>
            </ResponsiveCol>
          </Row>
          <Row gutter={10}>
            <ResponsiveCol span={24} md={24}>
              <Form.Item
                label="Province"
                name="provinceId"
                rules={[{ required: true, message: 'Province is required' }]}
              >
                <Select placeholder="- Please Select -" size="large">
                  {/* Replace with dynamic data */}
                  <Option value="1">Province 1</Option>
                  <Option value="2">Province 2</Option>
                </Select>
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="City"
                name="cityId"
                rules={[{ required: true, message: 'City is required' }]}
              >
                <Select placeholder="- Please Select -" size="large">
                  {/* Replace with dynamic data */}
                  <Option value="1">City 1</Option>
                  <Option value="2">City 2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Postcode / Zip"
                name="postcode"
                rules={[{ required: true, message: 'Postcode is required' }]}
              >
                <Input placeholder="Postcode / Zip" size="large" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                label="Shipping Cost"
                name="shippingService"
                rules={[{ required: true, message: 'City is required' }]}
              >
                <Select placeholder="- Please Select -" size="large">
                  {/* Replace with dynamic data */}
                  <Option value="1">ZNE</Option>
                  <Option value="2">Z&T</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Checkout" navigations={['Home', 'Order', 'Checkout']} />
      <section className="container">
        <Form form={form} layout="vertical">
          <Row gutter={20}>
            <Col span={24} md={14}>
              <div className="steps-">
                {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, corporis. */}
                {/* <CheckoutForm /> */}
                <Steps
                  current={currentStep}
                  size="small"
                  className="text-slate-300 mb-6 text-primary font-semibold"
                >
                  {steps.map((item) => (
                    <Steps.Step key={item.title} title={item.title} className="text-primary" />
                  ))}
                </Steps>
                <div className="steps-content">{steps[currentStep].content}</div>
                {/*  */}
                <div className="steps-action flex justify-center mt-4">
                  {currentStep < steps.length - 1 && (
                    <Button
                      type="primary"
                      onClick={() => nextStep()}
                      className="rounded-full shadow-none bg-primary px-6"
                      size="large"
                    >
                      Next
                    </Button>
                  )}
                  {currentStep > 0 && (
                    <Button
                      style={{ margin: '0 8px' }}
                      onClick={() => prevStep()}
                      className="rounded-full shadow-none px-6"
                      size="large"
                    >
                      Previous
                    </Button>
                  )}
                </div>
              </div>
            </Col>
            <Col span={24} md={10}>
              <Card>
                <h3 className="font-semibold text-md mb-4">Order Summary</h3>
                <div className="">
                  {/* product list */}
                  <div className="flex justify-between mb-2 items-center">
                    <div className="flex items-center">
                      <img src={'/noimg.png'} width={50} alt="" className="border" />
                      <h3>
                        Product Name
                        <span className="font-semibold">&nbsp; x2</span>
                      </h3>
                    </div>
                    <span>Rp 100.000</span>
                  </div>
                  <Divider className="my-2" />
                </div>
                <div className="">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp 100.000</span>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Rp 10.000</span>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between mb-4">
                    <span>TOTAL</span>
                    <span>Rp 110.000</span>
                  </div>
                </div>
                <Button
                  type="primary"
                  onClick={handlePlaceOrder}
                  className={`w-full shadow-none rounded-full ${
                    buttonPlaceOrderDisabled ? 'bg-disabled' : 'bg-primary'
                  }`}
                  size="large"
                  loading={false}
                  disabled={buttonPlaceOrderDisabled ? true : false}
                >
                  Place Order
                </Button>
              </Card>
            </Col>
          </Row>
        </Form>
      </section>
    </>
  );
}
