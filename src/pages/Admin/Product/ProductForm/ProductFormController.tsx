import { FormType, IFormProps } from '@/types/global/form';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function useProductFormController(props: IFormProps) {
  const { formType } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const [tabKey, setTabKey] = useState<string>(searchParams.get('tab') ?? 'product-details');

  /**
   * Handle Tab Change
   */
  const handleTabChange = (key: string) => {
    setTabKey(key);
    setSearchParams({
      tab: key,
    });
  };

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

  /**
   * Effects
   */
  useEffect(() => {
    setTabKey(searchParams.get('tab') ?? 'product-details');
  }, [searchParams]);

  return {
    handleTabChange,
    tabKey,
    breadcrumbItem,
  };
}
