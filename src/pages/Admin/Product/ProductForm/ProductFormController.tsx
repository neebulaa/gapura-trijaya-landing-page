import { debounce } from '@/commons/utils/Debounce';
import { useGetAttributes } from '@/services/queries/admin/attribute.query';
import { useGetCategories } from '@/services/queries/admin/category.query';
import {
  useCreateProduct,
  useGetProduct,
  useUpdateProduct,
} from '@/services/queries/admin/product.query.ts';
import { IValidationErrors, QueryParams } from '@/types/base';
import { ICategory } from '@/types/category';
import { FormType, IFormProps } from '@/types/global/form.ts';
import { OutletContextInterface } from '@/types/global/outletContext';
import { IProduct, ProductQueryParams } from '@/types/product';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';

export default function useProductFormController(props: IFormProps) {
  const { formType } = props;
  const navigate = useNavigate();
  const { openNotification } = useOutletContext<OutletContextInterface>();

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
  const [attributeQuery, _setAttributeQuery] = useState<ProductQueryParams>({
    page: 1,
    // limit: 50,
    isConfigurable: true,
  });
  const [validationErrors, setValidationErrors] = useState<IValidationErrors | null>({
    message: '',
    errors: {},
  });

  /**
   * Model Query: Product
   */
  const {
    data: productData,
    isFetching: productDataIsFetching,
    refetch: productDataRefetch,
  } = useGetProduct(id!, {
    enabled: formType == FormType.UPDATE,
  });

  const { mutateAsync: mutateCreateProduct, isPending: mutateCreateProductIsLoading } =
    useCreateProduct();

  const { mutateAsync: mutateUpdateProduct, isPending: mutateUpdateProductIsLoading } =
    useUpdateProduct(id!);

  /**
   * Model Query: Attribute
   */
  const { data: attributeData } = useGetAttributes(attributeQuery);

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
      await mutateCreateProduct({
        ...values,
        status: values.status ? values.status : 0, // 0=draft, 1=publish
      })
        .then((res) => {
          setValidationErrors(null);
          navigate(`/admin/products/${res.data.id}/edit`);
        })
        .catch((err) => {
          if (err.response && err.response.status === 422)
            setValidationErrors(err.response.data.errors);

          openNotification({
            type: 'error',
            title: 'Error',
            message: err?.response.data.message,
          });
        });
      return;
    }

    // Update Product
    // Transform variants keys into array
    const variantsArray: { [key: string]: any }[] = [];
    const variantKeys = Object.keys(values).filter((key) => key.startsWith('variants['));
    const variantIds = [...new Set(variantKeys.map((key) => key.match(/variants\[(.*?)\]/)![1]))];
    variantIds.forEach((variantId) => {
      const variant = {
        id: values[`variants[${variantId}][id]`],
        sku: values[`variants[${variantId}][sku]`],
        name: values[`variants[${variantId}][name]`],
        price: values[`variants[${variantId}][price]`],
        qty: values[`variants[${variantId}][qty]`],
        weight: values[`variants[${variantId}][weight]`],
      };
      variantsArray.push(variant);
    });

    await mutateUpdateProduct({
      ...values,
      variants: variantsArray,
      status: values.status ? values.status : 0, // 0=draft, 1=publish
    })
      .then((res) => {
        setValidationErrors(null);
        openNotification({
          type: 'success',
          title: 'Success',
          message: res?.message as string,
        });
        navigate(`/admin/products`);
      })
      .catch((err) => {
        if (err.response && err.response.status === 422)
          setValidationErrors(err.response.data.errors);

        openNotification({
          type: 'error',
          title: 'Error',
          message: err?.response.data.message,
        });
      });
    return;
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (productData && formType == FormType.UPDATE) {
      if (productData?.data?.type == 'configurable') {
        const variantsData: { [key: string]: any } = {};

        (productData?.data as IProduct).variants!.map((variant: IProduct) => {
          variantsData[`variants[${variant.id}][id]`] = variant.id;
          variantsData[`variants[${variant.id}][sku]`] = variant.sku;
          variantsData[`variants[${variant.id}][name]`] = variant.name;
          variantsData[`variants[${variant.id}][price]`] = variant.price;
          variantsData[`variants[${variant.id}][qty]`] = variant.qty;
          variantsData[`variants[${variant.id}][weight]`] = variant.weight;
        });

        form.setFieldsValue({
          ...productData.data,
          categories: productData?.data?.categories?.map((d: ICategory) => d.id),
          ...variantsData,
        });
      }

      form.setFieldsValue({
        ...productData.data,
        categories: productData?.data?.categories?.map((d: ICategory) => d.id),
      });
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
    productData,
    productDataIsFetching,
    productDataRefetch,
    categoryData,
    handleCategorySearch,
    handleSubmit,
    mutateCreateProductIsLoading,
    mutateUpdateProductIsLoading,
    attributeData,
    validationErrors,
  };
}
