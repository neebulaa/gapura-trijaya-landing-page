import { IValidationErrors } from '@/types/base';
import { App, Form } from 'antd';
import { useState } from 'react';

export const useContactController = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const { name, phone, message } = values;

      // Construct the WhatsApp URL
      const adminPhoneNumber = '628983167799'; // Replace with the admin's WhatsApp number
      const text = `
Hello Trijaya Min,

Saya ingin menyampaikan beberapa masukan dan pertanyaan dengan pesan berikut:
${message}

Salam hangat, ${name} (+62${phone})
`;

      const url = `https://api.whatsapp.com/send/?phone=${adminPhoneNumber}&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;

      window.open(url, '_blank');
    } catch (error) {
      console.error('Error:', error);
      message.error('Please Fill in the form correctly!');
    }
  };

  /**
   * State
   */
  const [validationErrors, _setValidationErrors] = useState<IValidationErrors | null>({
    message: '',
    errors: {},
  });
  return {
    form,
    handleSubmit,
  };
};
