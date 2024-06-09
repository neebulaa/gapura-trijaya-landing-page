import useCartStore from '@/commons/store/useCartStore';
import { useCreateCart } from '@/services/queries/cart.query';
import { IProduct } from '@/types/product';
import { Form, Select, message } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useShopDetailFormController(productDetailData: IProduct) {
  // const navigate = useNavigate();
  const { Option } = Select;

  /**
   * State
   */
  const [quantity, setQuantity] = useState<number>(1);
  const [form] = Form.useForm();
  const { setItem } = useCartStore((state) => state);

  /** Product Attributes: State */
  const [searchParams, setSearchParams] = useSearchParams();
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  console.log('searchParams: ', searchParams);
  console.log('formValues: ', formValues);

  /**
   * Query Model New Cart
   */
  const { mutateAsync: mutateCreateCart, isPending: mutateCreateCartIsLoading } = useCreateCart();

  /**
   * Handlers
   */
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };

  /**
   * Handle Submit/Add to Bag
   */
  const handleSubmit = async () => {
    form.validateFields();
    const values = form.getFieldsValue();

    // NOTE: need to add to local storage also
    setItem({
      ...values,
      quantity: quantity,
    });

    mutateCreateCart({
      productId: values.variant,
      quantity: quantity,
      meta: {
        note: values.description,
      },
    })
      .then((_res) => {
        message.success('Successfully added to cart!');
      })
      .catch((err) => {
        if (err?.response?.status === 401) {
          message.error('Please login first');
        }
      });
  };

  const handleChangeVariant = (value: string) => {
    // const slug = productDetailData?.variants?.find((variant) => variant.id === value)?.slug;
    // navigate(`/shop/${slug}`, { replace: true });
    console.log('variant: ', value);
  };

  const renderAttributeSelects = (attributes: { [key: string]: { [key: string]: string } }) => {
    return Object.keys(attributes).map((key) => {
      const label = `Pilih ${key.charAt(0).toUpperCase() + key.slice(1)}`;
      const defaultValue = formValues[key] || Object.keys(attributes[key])[0];

      return (
        <Form.Item key={key} label={label} name={key} rules={[{ required: false }]}>
          <Select
            defaultValue={defaultValue}
            value={formValues[key]}
            onChange={(value) => handleSelectChange(key, value)}
            placeholder={`Pilih ${key}`}
          >
            {Object.keys(attributes[key]).map((attrKey) => (
              <Option key={attrKey} value={attrKey}>
                {attributes[key][attrKey]}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    });
  };

  /**
   * Effects
   */
  useEffect(() => {
    form.setFieldsValue({
      quantity: quantity,
      variant: productDetailData?.variants?.[0]?.id,
    });
  }, [productDetailData]);

  /**
   * Product Attribute: Effects
   */
  useEffect(() => {
    const initialValues: { [key: string]: string } = {};
    Object.keys(productDetailData?.attributes || {}).forEach((key) => {
      const firstOptionKey = Object.keys(productDetailData.attributes[key])[0];
      initialValues[key] = searchParams.get(key) || firstOptionKey;
    });
    setFormValues(initialValues);
  }, [productDetailData, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(formValues);
    setSearchParams(params);
  }, [formValues, setSearchParams]);

  const handleSelectChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return {
    form,
    quantity,
    setQuantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleSubmit,
    mutateCreateCartIsLoading,
    handleChangeVariant,
    renderAttributeSelects,
    handleSelectChange,
  };
}
