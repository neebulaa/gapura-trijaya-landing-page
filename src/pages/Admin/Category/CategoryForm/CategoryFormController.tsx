import { Form } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormType, IFormProps } from '@/types/global/form.ts';
import {
  useCreateCategory,
  useGetCategory,
  useUpdateCategory,
} from '@/services/queries/admin/category.query.ts';
import { useEffect } from 'react';

export default function useCategoryFormController(props: IFormProps) {
  const { formType } = props;
  const navigate = useNavigate();
  /**
   * Params
   */
  const { id } = useParams();

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

  const {
    mutateAsync: mutateCreateCategory,
    isPending: mutateCreateCategoryIsLoading,
  } = useCreateCategory();

  const {
    mutateAsync: mutateUpdateCategory,
    isPending: mutateUpdateCategoryIsLoading,
  } = useUpdateCategory(id!);

  /**
   * Handle Submit
   */
  // console.log(categoryData);
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
    handleSubmit,
    mutateCreateCategoryIsLoading,
    mutateUpdateCategoryIsLoading,
  };
}
