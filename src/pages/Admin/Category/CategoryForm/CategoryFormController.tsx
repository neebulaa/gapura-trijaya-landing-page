import { Form } from 'antd';
import { Link } from 'react-router-dom';
import { FormType, IFormProps } from '@/types/global/form.ts';

export default function useCategoryFormController(props: IFormProps) {
  const { formType } = props;

  /**
   * State
   */
  const [form] = Form.useForm();

  /**
   * Get Category
   */

    //
  const onFinish = () => {
      console.log('submit');
    };

  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    {
      title: 'Home'
    },
    {
      title: <Link to="/app/category">Category</Link>
    },
    {
      title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Category`
    }
  ];

  return {
    form,
    onFinish,
    breadcrumbItem
  };
}