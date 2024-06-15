import { useEffect, useState } from 'react';
import { PromoQuantityProductModalProps } from '@/pages/Admin/Promo/Interfaces/PromoQuantityProductModalProps.ts';
import { Form } from 'antd';
import { useGetProducts } from '@/services/queries/admin/product.query.ts';
import { QueryParams } from '@/types/base.ts';
import { FormType } from '@/types/global/form.ts';
import { debounce } from '@/commons/utils/Debounce.ts';

const usePromoQuantityProductModalController = (props: PromoQuantityProductModalProps) => {
  /**
   * Props
   */
  const { handleOk, handleCancel, data, isOpen, type } = props;

  /**
   * States
   */
  const [form] = Form.useForm();

  /**
   * Get Product
   */
  const [productQuery, setProductQuery] = useState<QueryParams>({
    page: 1,
    limit: 20,
  });

  const { data: productsData } = useGetProducts(productQuery, {
    enabled: isOpen && type === FormType.CREATE,
  });

  /**
   * Handle Search Products
   */
  const handleSearchProducts = debounce((value: string) => {
    console.log(value);
    setProductQuery({
      ...productQuery,
      page: 1,
      search: value,
    });
  });

  /**
   * Handle Ok
   */
  const handleModalOk = () => {
    form.validateFields().then((values) => {
      handleOk?.(
        {
          id: values.id,
          productId: values.productId,
          qty: values.qty,
          product:
            data?.product ?? productsData?.data.find((product) => product.id === values.productId),
        },
        type,
      );
      form.resetFields();
    });
  };

  /**
   * Handle Cancel
   */
  const handleModalCancel = () => {
    handleCancel?.();
  };

  /**
   * useEffect
   */
  useEffect(() => {
    if (data) {
      form.setFieldsValue({ ...data, productName: data.product?.name });
    }
  }, [data]);

  return {
    form,
    handleModalOk,
    handleModalCancel,
    productsData,
    handleSearchProducts,
  };
};

export default usePromoQuantityProductModalController;
