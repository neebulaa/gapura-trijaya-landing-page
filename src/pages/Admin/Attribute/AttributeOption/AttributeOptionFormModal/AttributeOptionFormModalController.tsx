import { IAttributeOptionModal } from '@/pages/Admin/Attribute/AttributeOption/interface/attributeOptionModal.interface';
import { Form } from 'antd';

export default function useAttributeOptionFormModal(props: IAttributeOptionModal) {
  /**
   * Props
   */
  const { modalState, handleOk, handleCancel } = props;

  /**
   * States
   */
  const [form] = Form.useForm();

  /**
   * Handlers
   */
  const handleModalOk = async () => {
    await form.validateFields();
    if (typeof handleOk === 'function') {
      handleOk({ ...form.getFieldsValue() });
    }
  };

  const handleModalCancel = () => {
    if (typeof handleCancel === 'function') {
      handleCancel();
    }
  };

  return {
    form,
    modalState,
    handleModalOk,
    handleModalCancel,
  };
}
