import FormItem from '@/commons/components/Form/FormItem';
import PageHeader from '@/commons/components/Layout/HomeLayout/PageHeader';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import { ApiImgUrl } from '@/commons/utils/ApiImgUrl';
import { separator } from '@/commons/utils/Currency/Currency';
import useCheckoutController from '@/pages/Order/Checkout/CheckoutController';
import { IShippingService } from '@/types/order';
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
    mutateCreateOrderIsLoading,
    cartItems,
    cartSubTotal,
    cartTotal,
    provinceData,
    handleProvinceChange,
    filterProvinceOption,
    cityData,
    cityDataIsFetching,
    cityDataIsStale,
    handleCityChange,
    filterCityOption,
    shippingServices,
    mutateShippingServicesIsLoading,
    handleShippingServicesChange,
    selectedShippingService,
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
                <Select
                  showSearch
                  placeholder="- Please Select -"
                  size="large"
                  optionLabelProp="label"
                  filterOption={filterProvinceOption}
                  onChange={handleProvinceChange}
                  options={
                    provinceData?.data
                      ? Object.entries(provinceData.data).map(([id, name]) => ({
                          value: id,
                          label: name,
                        }))
                      : []
                  }
                />
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
                <Select
                  showSearch
                  placeholder="- Please Select -"
                  size="large"
                  optionLabelProp="label"
                  filterOption={filterCityOption}
                  onChange={handleCityChange}
                  loading={!cityDataIsStale || cityDataIsFetching}
                  disabled={!cityDataIsStale || cityDataIsFetching}
                  options={
                    cityData?.data
                      ? Object.entries(cityData.data).map(([id, name]) => ({
                          value: id,
                          label: name,
                        }))
                      : []
                  }
                />
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
                rules={[{ required: true, message: 'Shipping Cost is required' }]}
              >
                <Select
                  placeholder="- Please Select -"
                  size="large"
                  disabled={mutateShippingServicesIsLoading || cityDataIsFetching}
                  loading={mutateShippingServicesIsLoading}
                  onChange={handleShippingServicesChange}
                  className="w-full"
                >
                  {shippingServices?.results.map((service: IShippingService) => (
                    <Option key={service.service} value={service.service}>
                      {service.service} | Rp {separator(service.cost)} |{' '}
                      {service.etd.replace('HARI', '')} days
                    </Option>
                  ))}
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
        <Form form={form} layout="vertical" autoComplete="off">
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
                  {/* loop product list */}
                  {cartItems.map((item) => (
                    <div className="flex justify-between mb-2 items-center" key={item.id}>
                      <div className="flex items-center">
                        {item.image ? (
                          <img
                            src={ApiImgUrl(item.image)}
                            width={50}
                            alt={item.name}
                            className="border rounded-lg"
                          />
                        ) : (
                          <img
                            src={'/noimg.png'}
                            width={50}
                            alt={item.name}
                            className="border rounded-lg"
                          />
                        )}
                        <h3 className="pl-2">
                          <span>{item.name}</span>
                          <span className="font-semibold">&nbsp; x{item.quantity}</span>
                        </h3>
                      </div>
                      <span>Rp {separator(item.price)}</span>
                    </div>
                  ))}
                  {/* ./loop product list */}
                  <Divider className="my-2" />
                </div>
                <div className="">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp {separator(cartSubTotal)}</span>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Rp {separator(selectedShippingService?.cost)}</span>
                  </div>
                  <Divider className="my-2" />
                  <div className="flex justify-between mb-4 font-semibold">
                    <span>TOTAL</span>
                    <span>Rp {separator(cartTotal + selectedShippingService?.cost)}</span>
                  </div>
                </div>
                <Button
                  type="primary"
                  onClick={handlePlaceOrder}
                  className={`w-full shadow-none rounded-full ${
                    buttonPlaceOrderDisabled ? 'bg-disabled' : 'bg-primary'
                  }`}
                  size="large"
                  loading={mutateCreateOrderIsLoading}
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
