import FormItem from '@/commons/components/Form/FormItem';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import { Form, Input, Row } from 'antd';

export default function CheckoutBillingInformation() {
  return (
    <section className="checkout-content-body" id="checkout-billing-information">
      <h2 className="mb-1-05">Contact Details</h2>
      <Form autoComplete="off" className="" layout="vertical">
        <Row gutter={10}>
          <ResponsiveCol span={24} md={12}>
            <FormItem
              label="Full Name"
              name="name"
              className="font-normal"
              rules={[{ required: true }]}
              //   validationErrors={validationErrors}
            >
              <Input placeholder="name" size="large" />
            </FormItem>
          </ResponsiveCol>
          <ResponsiveCol span={24} md={12}>
            <FormItem
              label="Email (Optional)"
              name="email"
              className="font-normal"
              rules={[{ required: false }]}
              //   validationErrors={validationErrors}
            >
              <Input placeholder="email" size="large" />
            </FormItem>
          </ResponsiveCol>
        </Row>
        <Row>
          <ResponsiveCol span={24} md={24}>
            <FormItem
              label="Phone Number (Whatsapp)"
              name="phone"
              className="font-normal"
              rules={[{ required: true }]}
              // validationErrors={validationErrors}
            >
              <Input addonBefore={`+62`} placeholder="phone" size="large" />
            </FormItem>
          </ResponsiveCol>
        </Row>
        <Row>
          <ResponsiveCol span={24} md={24}>
            <FormItem
              label="Order Note (Optional)"
              name="note"
              className="font-normal"
              rules={[{ required: false }]}
              // validationErrors={validationErrors}
            >
              <Input.TextArea placeholder="Order Note" rows={3} />
            </FormItem>
          </ResponsiveCol>
        </Row>
      </Form>
    </section>
  );
}