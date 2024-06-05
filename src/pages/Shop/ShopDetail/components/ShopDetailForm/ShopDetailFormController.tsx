import useCartStore from '@/commons/store/useCartStore';
import { IProduct } from '@/types/product';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useShopDetailFormController(productDetailData: IProduct) {
  const navigate = useNavigate();

  /**
   * State
   */
  const [quantity, setQuantity] = useState<number>(1);
  const [form] = Form.useForm();
  const { setItem: addItem } = useCartStore((state) => state);

  /**
   * Handlers
   */
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const handleSubmit = async () => {
    form.validateFields();
    const values = form.getFieldsValue();
    console.log('submit values: ', values);

    addItem({
      ...values,
      quantity: quantity,
    });
  };

  const handleChangeVariant = (value: string) => {
    // const slug = productDetailData?.variants?.find((variant) => variant.id === value)?.slug;
    // navigate(`/shop/${slug}`, { replace: true });
    console.log('variant: ', value);
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

  return {
    form,
    quantity,
    setQuantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleSubmit,
    handleChangeVariant
  };
}