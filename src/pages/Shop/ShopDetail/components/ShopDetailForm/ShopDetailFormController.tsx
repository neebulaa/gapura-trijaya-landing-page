import useCartStore from '@/commons/store/useCartStore';
import { useCreateCart } from '@/services/queries/cart.query';
import { IProduct } from '@/types/product';
import { Form, message } from 'antd';
import { useEffect, useState } from 'react';

export default function useShopDetailFormController(productDetailData: IProduct) {
  // const navigate = useNavigate();

  /**
   * State
   */
  const [quantity, setQuantity] = useState<number>(1);
  const [form] = Form.useForm();
  const { setItem } = useCartStore((state) => state);

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
    // setItem({
    //   ...values,
    //   quantity: quantity,
    // });
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
    handleChangeVariant,
  };
}
