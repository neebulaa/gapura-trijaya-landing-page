import FormItem from '@/commons/components/Form/FormItem';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import { Button, DatePicker, Form, Input, Radio, Row } from 'antd';

export default function ProfilePersonalInformation() {
  return (
    <>
      <h2 className="mb-1-05">Contact Details</h2>
      <Form layout="vertical">
        <Row gutter={24}>
          <ResponsiveCol span={24} md={24}>
            <FormItem
              label="Name"
              name="name"
              className="font-normal"
              rules={[{ required: true }]}
              // validationErrors={validationErrors}
            >
              <Input placeholder="Name" size="large" />
            </FormItem>
          </ResponsiveCol>
        </Row>
        <Row gutter={24}>
          <ResponsiveCol span={24} md={24}>
            <FormItem
              label="Email"
              name="email"
              className="font-normal"
              rules={[{ required: true }]}
              // validationErrors={validationErrors}
            >
              <Input placeholder="Email" size="large" />
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
              label="Gender"
              name="gender"
              className="font-normal"
              rules={[{ required: false }]}
              // validationErrors={validationErrors}
            >
              <Radio.Group onChange={() => console.log('radio')}>
                <Radio value={'L'}>Male</Radio>
                <Radio value={'P'}>Female</Radio>
              </Radio.Group>
            </FormItem>
          </ResponsiveCol>
        </Row>
        <Row>
          <ResponsiveCol span={24} md={12}>
            <FormItem
              label="Tanggal Lahir"
              name="date"
              className="font-normal"
              rules={[{ required: false }]}
              // validationErrors={validationErrors}
            >
              <DatePicker size="large" className="w-full" />
            </FormItem>
          </ResponsiveCol>
        </Row>
        <Button
          type="primary"
          // onClick={handleSubmit}
          className="bg-color-[#18428F] shadow-none px-6"
          size="large"
          loading={false}
          style={{
            backgroundColor: '#18428F',
            borderColor: '#18428F',
            borderRadius: '25rem',
          }}
        >
          Save
        </Button>
      </Form>
    </>
  );
}
