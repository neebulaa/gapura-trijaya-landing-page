import IconLocation from '@/commons/assets/icons/IconLocation';
import FormItem from '@/commons/components/Form/FormItem';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import { IValidationErrors } from '@/types/base';
import { App, Button, Form, Input, InputNumber, Row } from 'antd';
import { useState } from 'react';
import ContactGoogleMaps from './components/ContactGoogleMaps/ContactGoogleMaps';
import { useContactController } from './ContactController';

export default function Contact() {
  const { message } = App.useApp();
  const { form, handleSubmit } = useContactController(); // Use the controller

  /**
   * State
   */
  const [validationErrors, _setValidationErrors] = useState<IValidationErrors | null>({
    message: '',
    errors: {},
  });

  return (
    <>
      <section className="container" id="contact">
        <div className="contact-info">
          <h1>Let's Chat, Reach Out to Us</h1>
          <p className="mt-[1.25rem] mb-1">
            Have questions or feedback? We’re here to help. Send us a message and we’ll respond
            during our working hours.
          </p>
          <div className="card-bordered mt-4">
            <div>
              <div className="flex gap-05">
                <div className="highlight">
                  <IconLocation width="20" height="20" />
                </div>
                <p className="semibold">Trijaya Mandiri Digital Printing - Percetakan Pontianak</p>
              </div>
              <p className="mt-05">
                Jl. Sumatera Gg. Sederhana Akcaya Kec. Pontianak Sel. Kota Pontianak, Kalimantan
                Barat 78121, Indonesia
              </p>
              <div
                className="mt-4"
                style={{
                  height: '400px',
                  background: 'lightgray',
                  position: 'relative',
                }}
              >
                <ContactGoogleMaps />
              </div>
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
                  rules={[{ required: true, message: 'Please enter your name' }]}
                  validationErrors={validationErrors}
                >
                  <Input placeholder="name" size="large" />
                </FormItem>
              </ResponsiveCol>
            </Row>
            <Row>
              <ResponsiveCol span={24} md={24}>
                <FormItem
                  label="Phone Number (WhatsApp)"
                  name="phone"
                  className="font-normal"
                  rules={[{ required: true, message: 'Please enter your phone number' }]}
                  validationErrors={validationErrors}
                >
                  <InputNumber
                    className="w-full"
                    addonBefore={`+62`}
                    placeholder="phone"
                    size="large"
                  />
                </FormItem>
              </ResponsiveCol>
            </Row>
            <Row>
              <ResponsiveCol md={24}>
                <FormItem
                  label="Messages"
                  name="message"
                  className="font-normal"
                  rules={[{ required: true, message: 'Please enter your message' }]}
                  validationErrors={validationErrors}
                >
                  <Input.TextArea placeholder="message" size="large" rows={6} />
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
                  height: '3.2rem',
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
