import useCartStore from '@/commons/store/useCartStore';
import { useCreateOrder } from '@/services/queries/order.query';
import { Form, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useCheckoutController() {
  const navigate = useNavigate();

  /** State */
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    items: cartItems,
    subTotal: cartSubTotal,
    total: cartTotal,
    //
  } = useCartStore.getState();

  /**
   * Query Model: Create Order
   */
  const { mutateAsync: mutateCreateOrder, isPending: mutateCreateOrderIsLoading } =
    useCreateOrder();

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
        // price: item.product.price,
        // total: item.product.price * item.quantity,
      })),
    };
    console.log('values:', params);
    await mutateCreateOrder(params)
      .then((res) => {
        message.success('Order has been placed successfully');
        navigate(`/order/received/${res.data.id}`);
      })
      .catch((err) => {
        message.error('Failed to place order');
        console.log('Failed to place order:', err);
      });
  };

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
  };
}
