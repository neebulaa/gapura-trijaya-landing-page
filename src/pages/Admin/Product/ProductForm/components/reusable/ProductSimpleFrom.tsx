import FormItem from '@/commons/components/Form/FormItem';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import { Divider, Form, InputNumber, Row } from 'antd';

interface IProductSimpleFormProps {
  validationErrors?: any;
}

export default function ProductSimpleForm(props: IProductSimpleFormProps) {
  const { validationErrors } = props;

  return (
    <>
      <Divider orientation="left" plain orientationMargin="0">
        Product Detail
      </Divider>
      <Row gutter={24}>
        <ResponsiveCol span={24} md={8}>
          <FormItem
            label="Price"
            name="price"
            rules={[{ required: true }]}
            validationErrors={validationErrors}
          >
            <InputNumber
              min={0}
              // max={10}
              step={0.1}
              defaultValue={0}
              placeholder="Price"
              prefix="Rp"
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              className="w-full"
              stringMode
            />
          </FormItem>
        </ResponsiveCol>
        <ResponsiveCol span={24} md={8}>
          <Form.Item label="Weight [KG]" name="weight" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              max={10}
              step={0.1}
              defaultValue={0}
              placeholder="Weight"
              className="w-full"
              stringMode
            />
          </Form.Item>
        </ResponsiveCol>
        <ResponsiveCol span={24} md={8}>
          <Form.Item label="Qty Stock" name="qty" rules={[{ required: true }]} initialValue={1}>
            <InputNumber
              min={1}
              // max={10}
              defaultValue={1}
              placeholder="Stock"
              className="w-full"
              stringMode
            />
          </Form.Item>
        </ResponsiveCol>
      </Row>
      <Row gutter={24}>
        <ResponsiveCol span={24} md={8}>
          <Form.Item label="Length" name="length" rules={[{ required: false }]}>
            <InputNumber
              min={0}
              max={10}
              step={0.1}
              defaultValue={0}
              placeholder="Length"
              className="w-full"
            />
          </Form.Item>
        </ResponsiveCol>
        <ResponsiveCol span={24} md={8}>
          <Form.Item label="Width" name="width" rules={[{ required: false }]}>
            <InputNumber
              min={0}
              max={10}
              step={0.1}
              defaultValue={0}
              placeholder="Width"
              className="w-full"
            />
          </Form.Item>
        </ResponsiveCol>
        <ResponsiveCol span={24} md={8}>
          <Form.Item label="Height" name="height" rules={[{ required: false }]}>
            <InputNumber
              min={0}
              max={10}
              step={0.1}
              defaultValue={0}
              placeholder="Height"
              className="w-full"
            />
          </Form.Item>
        </ResponsiveCol>
      </Row>
    </>
  );
}
