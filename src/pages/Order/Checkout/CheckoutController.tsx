import useCartStore from '@/commons/store/useCartStore';
import { useCreateOrder, useGetCities, useGetProvinces } from '@/services/queries/order.query';
import { App, Form } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useCheckoutController() {
  const navigate = useNavigate();
  const { message } = App.useApp();

  /** State */
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    items: cartItems,
    subTotal: cartSubTotal,
    total: cartTotal,
    clearCart,
  } = useCartStore.getState();
  const [provinceId, setProvinceId] = useState<number>();

  /**
   * Query Model: Create Order
   */
  const { mutateAsync: mutateCreateOrder, isPending: _mutateCreateOrderIsLoading } =
    useCreateOrder();

  /**
   * Query Model: Get Provinces
   */
  const { data: provinceData, isPending: provinceDataIsFetching } = useGetProvinces({
    enabled: currentStep === 1 ? true : false,
  });

  /**
   * Query Model: Get Cities
   */
  const {
    data: cityData,
    isPending: cityDataIsFetching,
    isStale: cityDataIsStale,
  } = useGetCities({ provinceId: provinceId }, { enabled: provinceId ? true : false });

  /** Steps */
  const buttonPlaceOrderDisabled = currentStep !== 1;

  const nextStep = () => {
    form
      .validateFields()
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
    // setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  /**
   * Provinces: onchage select province
   */
  const handleProvinceChange = (value: number) => {
    form.setFieldsValue({ provinceId: value, cityId: null });
    setProvinceId(value);
  };

  /**
   * Provinces: onchage select province
   */
  const handleCityChange = (value: number) => {
    console.log('city changed');
  };

  /**
   * Place Order: Handle Submit
   */
  const handlePlaceOrder = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    const params = {
      ...values,
      ...(form as any).getFieldValue(),
      carts: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        attributes: item.attributes,
        // price: item.product.price,
        // total: item.product.price * item.quantity,
      })),
    };

    await mutateCreateOrder(params)
      .then((res) => {
        message.success('Order has been placed successfully');
        clearCart();
        navigate(`/order/received/${res.data.id}`);
      })
      .catch((err) => {
        message.error('Failed to place order');
        console.log('Failed to place order:', err);
      });
  };

  /**
   * Effects
   */

  return {
    currentStep,
    setCurrentStep,
    buttonPlaceOrderDisabled,
    nextStep,
    prevStep,
    form,
    handlePlaceOrder,
    cartItems,
    cartSubTotal,
    cartTotal,
    provinceData,
    provinceDataIsFetching,
    handleProvinceChange,
    cityData,
    cityDataIsFetching,
    cityDataIsStale,
    handleCityChange,
  };
}
