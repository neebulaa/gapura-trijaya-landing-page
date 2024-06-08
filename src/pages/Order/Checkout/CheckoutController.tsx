import { Form } from 'antd';
import { useState } from 'react';

export default function useCheckoutController() {
  /** State */
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

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

    console.log('values:', {
      ...values,
      ...(form as any).getFieldValue(),
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
  };
}
