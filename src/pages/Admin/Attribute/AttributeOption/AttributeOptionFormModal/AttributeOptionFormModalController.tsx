import { IAttributeOptionModal } from '@/pages/Admin/Attribute/AttributeOption/interface/attributeOptionModal.interface';
import { Form } from 'antd';
import { useEffect } from 'react';

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
    form.resetFields();
    if (typeof handleCancel === 'function') {
      handleCancel();
    }
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (modalState?.isOpen) {
      form.resetFields();
      if (modalState?.formMode === 'Edit') {
        // form.setFieldsValue(modalState?.data);
        // form.setFieldsValue({
        //   name: modalState?.attributeOption?.name,
        // });
        form.setFieldsValue(modalState?.attributeOption);
      }
    }
  }, [modalState]);

  return {
    form,
    modalState,
    handleModalOk,
    handleModalCancel,
  };
}
