import IconLocation from '@/commons/assets/icons/IconLocation';
import FormItem from '@/commons/components/Form/FormItem';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import { IValidationErrors } from '@/types/base';
import { App, Button, Form, Input, Row } from 'antd';
import { useState } from 'react';

export default function Contact() {
  const { message } = App.useApp();

  /**
   * State
   */
  const [validationErrors, _setValidationErrors] = useState<IValidationErrors | null>({
    message: '',
    errors: {},
  });
  const [form] = Form.useForm();

  /**
   * Handle Submit
   */
  const handleSubmit = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    console.log('values: ', values);
    message.success('MOCK: Your message has been sent');
  };

  return (
    <>
      <section className="container" id="contact">
        <div className="contact-info">
          <h1>Let's Chat, Reach Out to Us</h1>
          <p className="mt-1">
            Have questions or feedback? We’re Here to help. Send us a message and we’ll respond in
            our working hours
          </p>
          <div className="card-bordered mt-1">
            <div>
              <div className="flex gap-05">
                <div className="highlight">
                  <IconLocation width="20" height="20" />
                </div>
                <p className="semibold">Rumah Michelle</p>
              </div>
              <p className="mt-05">
                Sungai Jawi, Kec. Pontianak Kota, Kota Pontianak, Kalimantan Barat , Pontianak Kota,
                Kota Pontianak, Kalimantan Barat, 628983167799
              </p>
              <div
                className="mt-1"
                style={{
                  height: '200px',
                  background: 'lightgray',
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <Form form={form} layout="vertical" autoComplete="off" className="mt-1-05">
            <Row>
              <ResponsiveCol md={24}>
                <FormItem
                  label="Your Name"
                  name="name"
                  className="font-normal"
                  rules={[{ required: false }]}
                  validationErrors={validationErrors}
                >
                  <Input placeholder="name" size="large" />
                </FormItem>
              </ResponsiveCol>
            </Row>
            <Row>
              <ResponsiveCol span={24} md={24}>
                <FormItem
                  label="Phone Number (Whatsapp)"
                  name="phone"
                  className="font-normal"
                  rules={[{ required: false }]}
                  validationErrors={validationErrors}
                >
                  <Input addonBefore={`+62`} placeholder="phone" size="large" />
                </FormItem>
              </ResponsiveCol>
            </Row>
            <Row>
              <ResponsiveCol md={24}>
                <FormItem
                  label="Messages"
                  name="message"
                  className="font-normal"
                  rules={[{ required: false }]}
                  validationErrors={validationErrors}
                >
                  <Input.TextArea placeholder="message" size="large" rows={4} />
                </FormItem>
              </ResponsiveCol>
            </Row>
            <Row>
              <Button
                type="primary"
                onClick={handleSubmit}
                className="w-full bg-color-[#18428F]"
                size="large"
                style={{
                  backgroundColor: '#18428F',
                  borderColor: '#18428F',
                  borderRadius: '25rem',
                }}
              >
                Contact Us
              </Button>
            </Row>
          </Form>
        </div>
      </section>
    </>
  );
}
