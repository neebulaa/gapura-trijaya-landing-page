import { debounce } from '@/commons/utils/Debounce';
import {
  useCreateCategory,
  useGetCategories,
  useGetCategory,
  useUpdateCategory,
} from '@/services/queries/admin/category.query.ts';
import { QueryParams } from '@/types/base';
import { FormType, IFormProps } from '@/types/global/form.ts';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function useCategoryFormController(props: IFormProps) {
  const { formType } = props;
  const navigate = useNavigate();
  /**
   * Params
   */
  const { id } = useParams();

  /**
   * Get Category Parent
   */
  const [categoryParentQuery, setCategoryParentQuery] = useState<QueryParams>({
    page: 1,
    limit: 50,
  });

  const { data: categoryParentData } = useGetCategories(categoryParentQuery);

  /**
   * State
   */
  const [form] = Form.useForm();

  /**
   * Model
   */
  const { data: categoryData } = useGetCategory(id!, {
    enabled: formType == FormType.UPDATE,
  });

  const { mutateAsync: mutateCreateCategory, isPending: mutateCreateCategoryIsLoading } =
    useCreateCategory();

  const { mutateAsync: mutateUpdateCategory, isPending: mutateUpdateCategoryIsLoading } =
    useUpdateCategory(id!);

  /**
   * Handle Category Parent Search
   */
  const handleCategoryParentSearch = debounce((value: string) => {
    setCategoryParentQuery((prevState) => {
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
      // console.log('Create Category', values);
      await mutateCreateCategory(values);
      navigate('/admin/categories');
      return;
    }

    await mutateUpdateCategory(values);
    navigate('/admin/categories');
    return;
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (categoryData && formType == FormType.UPDATE) {
      form.setFieldsValue(categoryData.data);
    }
  }, [categoryData]);

  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    {
      title: 'Home',
    },
    {
      title: <Link to="/app/category">Category</Link>,
    },
    {
      title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Category`,
    },
  ];

  return {
    form,
    breadcrumbItem,
    categoryParentData,
    handleCategoryParentSearch,
    handleSubmit,
    mutateCreateCategoryIsLoading,
    mutateUpdateCategoryIsLoading,
  };
}
