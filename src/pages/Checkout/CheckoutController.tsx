import useUserStore from '@/commons/store/useUserStore';
import { useGetCarts } from '@/services/queries/cart.query';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';

export default function useCheckoutController() {
  const navigate = useNavigate();

  /** State */
  const { userData, setUserData } = useUserStore((state) => state);
  const [formBillingInformation] = Form.useForm();
  const [formCheckout] = Form.useForm();

  /** Query Get Cart */
  const { data: queryCartData, isPending: queryCartDataIsFetching } = useGetCarts();

  /** Handle Checkout Billing Information */
  const handleBillingInformationSubmit = () => {
    formBillingInformation.validateFields();
    const values = formBillingInformation.getFieldsValue();
    console.log(values);
  };

  /** Handle Checkout Place Order Submit */
  // const handleBillingInformationSubmit = () => {
  //   console.log('Place Order');
  // };

  /**
   * Calculate Subtotal, Shipping Cost, and Total
   */
  const subtotal =
    (queryCartData?.data as any)?.items!.reduce(
      (acc: any, item: any) => acc + item.product.price * item.quantity,
      0
    ) || 0;
  // Define shipping cost
  const shippingCost = 0; // Adjust this value as needed
  // Calculate total
  const total = subtotal + shippingCost;

  return {
    navigate,
    formBillingInformation,
    formCheckout,
    userData,
    setUserData,
    queryCartData,
    queryCartDataIsFetching,
    subtotal,
    shippingCost,
    total,
    handleBillingInformationSubmit,
  };
}
