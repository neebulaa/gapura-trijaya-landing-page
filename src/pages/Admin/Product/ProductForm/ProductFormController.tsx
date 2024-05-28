import { debounce } from '@/commons/utils/Debounce';
import { useGetCategories } from '@/services/queries/admin/category.query';
import {
  useCreateProduct,
  useGetProduct,
  useUpdateProduct,
} from '@/services/queries/admin/product.query.ts';
import { QueryParams } from '@/types/base';
import { FormType, IFormProps } from '@/types/global/form.ts';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function useProductFormController(props: IFormProps) {
  const { formType } = props;
  const navigate = useNavigate();
  /**
   * Params
   */
  const { id } = useParams();

  /**
   * Get Category
   */
  const [categoryQuery, setCategoryQuery] = useState<QueryParams>({
    page: 1,
    limit: 50,
  });

  const { data: categoryData } = useGetCategories(categoryQuery);

  /**
   * State
   */
  const [form] = Form.useForm();

  /**
   * Model
   */
  const { data: productData } = useGetProduct(id!, {
    enabled: formType == FormType.UPDATE,
  });

  const { mutateAsync: mutateCreateProduct, isPending: mutateCreateProductIsLoading } =
    useCreateProduct();

  const { mutateAsync: mutateUpdateProduct, isPending: mutateUpdateProductIsLoading } =
    useUpdateProduct(id!);

  /**
   * Handle Category Parent Search
   */
  const handleCategorySearch = debounce((value: string) => {
    setCategoryQuery((prevState) => {
      return { ...prevState, search: value };
    });
  });

  /**
   * Handle Submit
   */
  const handleSubmit = async () => {
    await form.validateFields();

    const values = form.getFieldsValue();

    if (formType == FormType.CREATE) {
      await mutateCreateProduct(values);
      navigate('/admin/products');
      return;
    }

    await mutateUpdateProduct(values);
    navigate('/admin/products');
    return;
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (productData && formType == FormType.UPDATE) {
      form.setFieldsValue(productData.data);
    }
  }, [productData]);

  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    {
      title: 'Home',
    },
    {
      title: <Link to="/admin/products">Product</Link>,
    },
    {
      title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Product`,
    },
  ];

  return {
    form,
    breadcrumbItem,
    //Category
    categoryData,
    handleCategorySearch,
    //Product
    handleSubmit,
    mutateCreateProductIsLoading,
    mutateUpdateProductIsLoading,
  };
}
