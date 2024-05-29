import { debounce } from '@/commons/utils/Debounce';
import {
  useCreateCategory,
  useGetCategories,
  useGetCategory,
  useUpdateCategory,
} from '@/services/queries/admin/category.query.ts';
import { QueryParams } from '@/types/base';
import { FormType, IFormProps } from '@/types/global/form.ts';
import { OutletContextInterface } from '@/types/global/outletContext';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';

export default function useCategoryFormController(props: IFormProps) {
  const { formType } = props;
  const navigate = useNavigate();

  const { openNotification } = useOutletContext<OutletContextInterface>();

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
      mutateCreateCategory(values)
        .then((res) => {
          openNotification({
            type: 'success',
            title: 'Success',
            message: res.message as string,
            // message: 'Category has been created successfully.',
          });
          navigate('/admin/categories');
        })
        .catch((err) => {
          openNotification({
            type: 'error',
            title: 'Error',
            message: err?.response.data.message,
          });
        });
      return;
    }

    mutateUpdateCategory(values)
      .then((res) => {
        openNotification({
          type: 'success',
          title: 'Success',
          message: res.message as string,
          // message: 'Category has been created successfully.',
        });
        navigate('/admin/categories');
      })
      .catch((err) => {
        openNotification({
          type: 'error',
          title: 'Error',
          message: err?.response.data.message,
        });
      });
    // navigate('/admin/categories');
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

  useEffect(() => {
    // console.log('Error Create Category: ', mutateCreateCategoryError);
    // console.log('Status Create Category: ', mutateCreateCategoryStatus);
    // const { openNotification } = useOutletContext<OutletContextInterface>();
    // openNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message: 'Oops! Something went wrong. Please try again.',
    // });
  }, []);

  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    { title: 'Home' },
    { title: <Link to="/admin/categories">Category</Link> },
    { title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Category` },
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
