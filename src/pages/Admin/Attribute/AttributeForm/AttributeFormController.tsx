import { debounce } from '@/commons/utils/Debounce';
import {
  useCreateAttribute,
  useGetAttribute,
  useGetAttributes,
  useUpdateAttribute,
} from '@/services/queries/admin/attribute.query.ts';
import { QueryParams } from '@/types/base';
import { FormType, IFormProps } from '@/types/global/form.ts';
import { OutletContextInterface } from '@/types/global/outletContext';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router-dom';

export function useAttributeFormController(props: IFormProps) {
  const { formType } = props;
  const navigate = useNavigate();

  const { openNotification } = useOutletContext<OutletContextInterface>();

  /**
   * Params
   */
  const { id } = useParams();

  /**
   * Get Attribute Parent
   */
  const [attributeParentQuery, setAttributeParentQuery] = useState<QueryParams>({
    page: 1,
    limit: 50,
  });

  const { data: attributeParentData } = useGetAttributes(attributeParentQuery);

  /**
   * State
   */
  const [form] = Form.useForm();

  /**
   * Model
   */
  const { data: attributeData } = useGetAttribute(id!, {
    enabled: formType == FormType.UPDATE,
  });

  const { mutateAsync: mutateCreateAttribute, isPending: mutateCreateAttributeIsLoading } =
    useCreateAttribute();

  const { mutateAsync: mutateUpdateAttribute, isPending: mutateUpdateAttributeIsLoading } =
    useUpdateAttribute(id!);

  /**
   * Handle Attribute Parent Search
   */
  const handleAttributeParentSearch = debounce((value: string) => {
    setAttributeParentQuery((prevState) => {
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
      mutateCreateAttribute(values)
        .then((res) => {
          openNotification({
            type: 'success',
            title: 'Success',
            message: res.message as string,
          });
          navigate('/admin/attributes');
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

    mutateUpdateAttribute(values)
      .then((res) => {
        openNotification({
          type: 'success',
          title: 'Success',
          message: res.message as string,
        });
        navigate('/admin/attributes');
      })
      .catch((err) => {
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
    if (attributeData && formType == FormType.UPDATE) {
      form.setFieldsValue(attributeData.data);
    }
  }, [attributeData]);

  useEffect(() => {
    // Additional effects can be added here if needed
  }, []);

  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    {
      title: 'Home',
    },
    {
      title: <Link to="/admin/attribute">Attribute</Link>,
    },
    {
      title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Attribute`,
    },
  ];

  return {
    form,
    breadcrumbItem,
    attributeParentData,
    handleAttributeParentSearch,
    handleSubmit,
    mutateCreateAttributeIsLoading,
    mutateUpdateAttributeIsLoading,
  };
}
