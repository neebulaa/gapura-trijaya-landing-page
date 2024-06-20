import useCartStore from '@/commons/store/useCartStore';
import {
  useCreateOrder,
  useGetCities,
  useGetProvinces,
  useMutateShippingServices,
} from '@/services/queries/order.query';
import { App, Form } from 'antd';
import { useEffect, useState } from 'react';
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
    promoValue: cartPromoValue,
    clearCart,
    appliedVoucher,
  } = useCartStore.getState();
  const [provinceId, setProvinceId] = useState<number>();
  const [shippingServices, setShippingServices] = useState<any>();
  const [selectedShippingService, setSelectedShippingService] = useState<any>({
    service: '',
    cost: 0,
    etd: '',
    courier: '',
  });

  /**
   * Query Model: Create Order
   */
  const { mutateAsync: mutateCreateOrder, isPending: mutateCreateOrderIsLoading } =
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

  /**
   * Query Model: Mutate Shipping Services
   */
  const {
    mutateAsync: mutateShippingServices,
    isPending: mutateShippingServicesIsLoading,
    isIdle: _mutateShippingServicesIsIdle,
  } = useMutateShippingServices();

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

  /** Province: filter province option */
  const filterProvinceOption = (input: string, option: any) =>
    option.label.toLowerCase().includes(input.toLowerCase());

  /**
   * Provinces: onchage select province
   */
  const handleCityChange = async (value: number) => {
    // console.log('city changed: ', value);
    form.setFieldsValue({ shippingService: null });
    await mutateShippingServices({
      cityId: value,
      carts: cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      })),
    }).then((res) => {
      console.log('res: ', res);
      setShippingServices(res.data);
    });
  };

  /** Province: filter city option */
  const filterCityOption = (input: string, option: any) =>
    option.label.toLowerCase().includes(input.toLowerCase());

  /**
   * Handles the change event for the shipping services.
   *
   * @param value - The selected value for the shipping services.
   */
  const handleShippingServicesChange = (value: string) => {
    const trimmedValue = value.replace(/\s/g, '').toLowerCase();
    // Temukan layanan pengiriman yang sesuai dengan nilai yang dipilih setelah menghapus spasi
    const selectedService = shippingServices?.results?.find(
      (service: any) => service.service.replace(/\s/g, '').toLowerCase() === trimmedValue,
    );

    setSelectedShippingService(selectedService);
    // console.log('shipping cost changed: ', selectedService);
  };

  /**
   * Handles the place order action.
   * Validates form fields, retrieves field values, and sends a request to create an order.
   * If successful, displays a success message, clears the cart, and navigates to the received order page.
   * If unsuccessful, displays an error message and logs the error.
   */
  const handlePlaceOrder = async () => {
    await form.validateFields();
    const params = {
      address1: form.getFieldValue('address1'),
      address2: form.getFieldValue('address2'),
      provinceId: form.getFieldValue('provinceId'),
      cityId: form.getFieldValue('cityId'),
      postcode: form.getFieldValue('postcode'),
      shippingService: form.getFieldValue('shippingService')?.replace(/\s/g, ''),
      firstName: form.getFieldValue('firstName'),
      lastName: form.getFieldValue('lastName'),
      email: form.getFieldValue('email'),
      phone: form.getFieldValue('phone'),
      note: form.getFieldValue('note'),
      discountAmount: +cartPromoValue,
      promoId: appliedVoucher?.id ?? undefined,
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
  useEffect(() => {
    if (cartItems.length < 1) navigate('/shop');
  }, [cartItems]);

  return {
    currentStep,
    setCurrentStep,
    buttonPlaceOrderDisabled,
    nextStep,
    prevStep,
    form,
    handlePlaceOrder,
    mutateCreateOrderIsLoading,
    cartItems,
    cartSubTotal,
    cartTotal,
    provinceData,
    provinceDataIsFetching,
    handleProvinceChange,
    filterProvinceOption,
    cityData,
    cityDataIsFetching,
    cityDataIsStale,
    handleCityChange,
    filterCityOption,
    shippingServices,
    mutateShippingServicesIsLoading,
    handleShippingServicesChange,
    selectedShippingService,
    cartPromoValue,
  };
}
