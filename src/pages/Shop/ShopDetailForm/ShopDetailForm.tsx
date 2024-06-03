import IconBag from '@/commons/assets/icons/IconBag';
import IconMinus from '@/commons/assets/icons/IconMinus';
import IconPlus from '@/commons/assets/icons/IconPlus';
import { separator } from '@/commons/utils/Currency/Currency';
import { Form, Input, Select } from 'antd';

export default function ShopDetailForm({ product, category }: any) {
  /**
   * State
   */
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields();
    const values = form.getFieldsValue();
    console.log('values: ', values);
  };

  return (
    <>
      <section className="shop-product-detail-form">
        <h1 className="product-name">{`Product Name 269`}</h1>
        <h2 className="product-price">Rp {separator(50000)}</h2>
        <p className="product-description">{`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias animi facilis necessitatibus itaque illo harum quam saepe odio incidunt fugit?`}</p>
        <hr className="mt-1 mb-1" />
        <Form form={form} layout="vertical">
          <Form.Item label="attribute" name="attribute" rules={[{ required: false }]}>
            <Select
              showSearch
              placeholder="Attribute"
              size="large"
              filterOption={false}
              optionLabelProp="label"
              onSearch={() => console.log('searching')}
              options={[
                {
                  value: 1,
                  label: 'Attribute 1',
                },
                {
                  value: 2,
                  label: 'Attribute 2',
                },
              ]}
            />
          </Form.Item>

          {/* <Form.Item label={`Pilih variant: Test`} name="variant" rules={[{ required: false }]}>
            <Space>
              <Button type="primary">Primary Button</Button>
              <Button type="primary">Primary Button</Button>
              <Button type="primary">Primary Button</Button>
            </Space>
          </Form.Item> */}

          <Form.Item label="Keterangan" name="keterangan" rules={[{ required: false }]}>
            <Input.TextArea placeholder="Keterangan" />
          </Form.Item>

          {/* <Form.Item label="" name="quantity" rules={[{ required: false }]}>
            <InputNumber addonBefore="-" addonAfter="+" defaultValue={100} className="w-10" />
          </Form.Item>

          <Button type="primary" size="large" onClick={() => console.log('add to bag')}>
            Add to bag
          </Button> */}

          <div className="mt-1-05 quantity-and-add-to-bag-button">
            <button type="button" className="btn btn-outline quantity-button no-hover no-pointer">
              <div onClick={() => console.log('increment qty')}>
                <IconMinus width="10" height="10" />
              </div>
              <p>{`3`}</p>
              <div onClick={() => console.log('decrement')}>
                <IconPlus width="14" height="14" />
              </div>
            </button>
            <button
              type="button"
              className="btn uppercase add-to-bag-button"
              onClick={handleSubmit}
            >
              <IconBag width="14" height="17" />
              Add to bag
            </button>
          </div>
        </Form>
      </section>
    </>
  );
}
