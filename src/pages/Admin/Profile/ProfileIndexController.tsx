import useUserStore from '@/commons/store/useUserStore';
import { useGetUserProfile, useUpdateUserProfile } from '@/services/queries/admin/profile.query';
import { IValidationErrors } from '@/types/base';
import { OutletContextInterface } from '@/types/global/outletContext';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

export default function useProfileIndexController() {
  const { openNotification } = useOutletContext<OutletContextInterface>();

  /** State */
  const [form] = Form.useForm();
  const { userData } = useUserStore((state) => state);
  const [validationErrors, setValidationErrors] = useState<IValidationErrors | null>({
    message: '',
    errors: {},
  });

  /** Query Get User */
  const { data: profileData } = useGetUserProfile(userData.id);

  /** Query Update User Profile */
  const { mutateAsync: updateProfile, isPending: updateProfileIsFetching } = useUpdateUserProfile(
    userData.id
  );

  /** Handle On Submit */
  const handleSubmit = async () => {
    const values = form.getFieldsValue();
    // console.log(values);
    await updateProfile(values)
      .then((res) => {
        setValidationErrors(null);
        openNotification({
          type: 'success',
          title: 'Success',
          message: res.message as string,
        });
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
  };

  /** Effects */
  useEffect(() => {
    if (profileData) {
      form.setFieldsValue({
        name: profileData?.data.name,
        email: profileData?.data.email,
      });
    }
  }, [profileData]);

  useEffect(() => {
    console.log('Validation Errors: ', validationErrors);
  }, [validationErrors]);

  return {
    form,
    handleSubmit,
    profileData,
    updateProfile,
    updateProfileIsFetching,
    validationErrors,
  };
}
