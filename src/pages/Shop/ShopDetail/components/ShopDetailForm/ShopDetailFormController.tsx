import useCartStore from '@/commons/store/useCartStore';
import { useProductStore } from '@/commons/store/useProductStore';
import { ShopDetailFormProps } from '@/pages/Shop/ShopDetail/components/ShopDetailForm/interface/ShopDetailForm.interface';
import { useGetProductByQuery } from '@/services/queries/product.query';
import { App, Form, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function useShopDetailFormController(props: ShopDetailFormProps) {
  // const navigate = useNavigate();
  const { productDetailData } = props;
  const { Option } = Select;
  const { message } = App.useApp();

  /**
   * State
   */
  const [quantity, setQuantity] = useState<number>(1);
  const [form] = Form.useForm();
  const { addItem, isLoading: addItemCartIsLoading } = useCartStore((state) => state);
  const { selectedVariant, setSelectedVariant } = useProductStore((state) => state);
  // const { userData } = useUserStore((state) => state);
  // const { selectedProduct } = useProductStore((state) => state);
  // const { items, addItem } = useCart();

  /** Product Attributes: State */
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamGet = (searchParams: any) => {
    let params: any = {};
    for (let [key, value] of searchParams.entries()) {
      // params.push();
      params[key] = value;
    }
    return params;
  };

  // console.log(getParams(searchParams));

  /**
   * Query Model New Cart
   */
  // const { mutateAsync: mutateCreateCart, isPending: mutateCreateCartIsLoading } = useCreateCart();

  /** Query Model: Get Product Variant */
  // const { data: productVariantData } = useGetProductByQuery(
  //   productDetailData?.slug,
  //   searchParamGet(searchParams)
  // );
  const { data: productVariantData } = useGetProductByQuery(
    selectedVariant?.slug as string,
    searchParamGet(searchParams)
  );

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
  const handleAddToCart = () => {
    // form.validateFields();
    // const values = form.getFieldsValue();
    // console.log('add to cart: ', selectedVariant?.id, quantity);

    addItem({
      id: selectedVariant?.id!,
      name: selectedVariant?.name!,
      slug: selectedVariant?.slug!,
      queryUrl: searchParams.toString(),
      price: selectedVariant?.price as number,
      image: selectedVariant?.images?.[0].path,
      quantity: quantity,
    });
    message.success('Successfully added to cart!');
  };

  /** Product Attribute Variant: Render Select */
  const renderAttributeSelects = (attributes: { [key: string]: { [key: string]: string } }) => {
    return Object.keys(attributes).map((key) => {
      const label = `Pilih ${key.charAt(0).toUpperCase() + key.slice(1)}`;

      return (
        <Form.Item key={key} label={label} name={key} rules={[{ required: false }]}>
          <Select placeholder={`Pilih ${key}`} onChange={(value) => handleSelectChange(key, value)}>
            {Object.keys(attributes[key]).map((attrKey) => (
              // <Option key={attrKey} value={attrKey}>
              //   {attributes[key][attrKey]}
              // </Option>
              <Option key={attributes[key][attrKey]} value={attributes[key][attrKey]}>
                {attributes[key][attrKey]}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    });
  };

  /** Product Attribtue Variant: Handle OnChange Select */
  const handleSelectChange = (key: string, value: string) => {
    form.setFieldsValue({ [key]: value });
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value);
    // newSearchParams.set(key, value.toLowerCase().replace(/ /g, '+'));
    setSearchParams(newSearchParams);

    productVariantData;
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
    if (productDetailData?.attributes) {
      Object.entries<{ [key: string]: string }>(productDetailData.attributes).forEach(
        ([key, value]) => {
          // Mendapatkan nilai dari objek atribut
          const firstOptionValue = Object.values(value)[0];
          initialValues[key] = searchParams.get(key) || firstOptionValue;
        }
      );
      form.setFieldsValue(initialValues);
    }

    // console.log('values: ', form.getFieldsValue());
    setSearchParams({
      ...form.getFieldsValue(),
      keterangan: form.getFieldValue('keterangan')?.toString() || '',
    });
    
    // 
    if (productVariantData) {
      setSelectedVariant?.({
        ...productDetailData,
        id: productVariantData?.data.id,
        name: productVariantData?.data.name,
        slug: productVariantData?.data.slug,
        price: productVariantData?.data.price,
        image: productVariantData?.data.images ? productVariantData?.data?.images[0]?.path : '',
      });
    }
  }, [productDetailData, searchParams, form]);

  /**
   * Product Variant: Effects
   */
  useEffect(() => {
    if (productVariantData) {
      setSelectedVariant?.({
        ...productDetailData,
        id: productVariantData?.data.id,
        name: productVariantData?.data.name,
        price: productVariantData?.data.price,
        image: productVariantData?.data.images ? productVariantData?.data?.images[0]?.path : '',
      });
    }

    // console.log('new productVariantData: ', selectedVariant);
    console.log('new productVariantData: ', selectedVariant);
    console.log('searchParams: ', searchParams.toString());
    
  }, [productVariantData, productDetailData]);

  /** Effects: Cart */
  // useEffect(() => {
  //   if (items) {
  //     console.log('items: ', items);
  //   }
  //   console.log('isLoading: ', isLoading);
  // }, [items, isLoading]);

  return {
    form,
    quantity,
    setQuantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleAddToCart,
    renderAttributeSelects,
    handleSelectChange,
    addItemCartIsLoading,
    selectedVariant,
  };
}
