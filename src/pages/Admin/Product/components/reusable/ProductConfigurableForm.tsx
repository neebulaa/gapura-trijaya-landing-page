import FormItem from '@/commons/components/Form/FormItem';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import { IProduct } from '@/types/product';
import { Divider, Form, Input, InputNumber, Row } from 'antd';

interface IProductConfigrableFormProps {
  productData?: IProduct;
  validationErrors?: any;
}

export default function ProductConfigurableForm(props: IProductConfigrableFormProps) {
  const { validationErrors, productData } = props;

  return (
    <>
      <Divider orientation="left" plain orientationMargin="0">
        <span className="text-blue-700">Product Variants</span>
      </Divider>
      {productData?.variants?.map((variant, index: number) => (
        <Row gutter={24} key={index}>
          <FormItem
            label="SKU"
            name={`variants[${variant.id}][id]`}
            // rules={[{ required: true }]}
            // validationErrors={validationErrors}
            hidden={true}
          >
            <Input />
          </FormItem>
          <ResponsiveCol span={24} md={5}>
            <FormItem
              label="SKU"
              name={`variants[${variant.id}][sku]`}
              rules={[{ required: true }]}
              validationErrors={validationErrors}
            >
              <Input placeholder="SKU" />
            </FormItem>
          </ResponsiveCol>
          <ResponsiveCol span={24} md={7}>
            <FormItem
              label="Name"
              name={`variants[${variant.id}][name]`}
              rules={[{ required: true }]}
              validationErrors={validationErrors}
            >
              <Input placeholder="Variant Name" />
            </FormItem>
          </ResponsiveCol>
          <ResponsiveCol span={24} md={3}>
            <FormItem
              label="Price"
              name={`variants[${variant.id}][price]`}
              rules={[{ required: true }]}
              validationErrors={validationErrors}
            >
              <InputNumber
                min={0}
                // max={10}
                defaultValue={0}
                placeholder="Price"
                className="w-full"
              />
            </FormItem>
          </ResponsiveCol>
          <ResponsiveCol span={24} md={3}>
            <Form.Item
              label="Stock"
              name={`variants[${variant.id}][qty]`}
              rules={[{ required: true}]}
            >
              <InputNumber
                min={1}
                // max={10}
                // step={0.1}
                defaultValue={0}
                placeholder="Stock"
                className="w-full"
              />
            </Form.Item>
          </ResponsiveCol>
          <ResponsiveCol span={24} md={3}>
            <Form.Item
              label="Weight"
              name={`variants[${variant.id}][weight]`}
              rules={[{ required: true }]}
            >
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
        </Row>
      ))}
    </>
  );
}
