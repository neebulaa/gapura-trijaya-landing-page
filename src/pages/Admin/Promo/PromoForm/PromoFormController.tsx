import { useEffect, useMemo, useState } from 'react';
import { FormType, IFormProps } from '@/types/global/form.ts';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { OutletContextInterface } from '@/types/global/outletContext.ts';
import {
  useCreatePromo,
  useGetPromo,
  useUpdatePromo,
} from '@/services/queries/admin/promo.query.ts';
import { Form } from 'antd';
import {
  CreatePromoDto,
  DiscountTypeEnum,
  IPromo,
  PromoTypeEnum,
  UpdatePromoDto,
} from '@/types/promo.ts';
import { debounce } from '@/commons/utils/Debounce.ts';
import dayjs from 'dayjs';

const usePromoFormController = (props: IFormProps) => {
  const { formType } = props;

  const { openNotification } = useOutletContext<OutletContextInterface>();
  const navigate = useNavigate();

  /**
   * Params
   */
  const { id } = useParams<{ id: string }>();

  /**
   * Get Promo
   */
  const { data: promoData } = useGetPromo(id!, { enabled: formType === FormType.UPDATE });

  /**
   * Mutate
   */
  const { mutateAsync: mutateCreatePromo, isPending: mutateCreatePromoIsLoading } =
    useCreatePromo<CreatePromoDto>(true);
  const { mutateAsync: mutateUpdatePromo, isPending: mutateUpdatePromoIsLoading } =
    useUpdatePromo<UpdatePromoDto>(id!, true);

  /**
   * States
   */
  const [form] = Form.useForm();
  const [tempSubmitData, setTempSubmitData] = useState<CreatePromoDto | UpdatePromoDto>({
    promoType: PromoTypeEnum.CODE,
    discountType: DiscountTypeEnum.AMOUNT,
  });

  /**
   * Handle Change values
   */
  const handleValuesChanges = debounce((changedValue: any) => {
    if ('promoType' in changedValue) {
      setTempSubmitData({
        ...tempSubmitData,
        promoType: changedValue.promoType,
      });
    }

    if ('discountType' in changedValue) {
      setTempSubmitData({
        ...tempSubmitData,
        discountType: changedValue.discountType,
      });
    }
  });

  /**
   * Disable Form
   */
  const disableFormBeforePromoType = useMemo(() => {
    if (tempSubmitData?.promoType) {
      return false;
    }
    return true;
  }, [tempSubmitData]);

  /**
   * Handle Submit
   */
  const handleSubmit = async () => {
    await form.validateFields();

    switch (formType) {
      case FormType.CREATE:
        try {
          await mutateCreatePromo({
            name: form.getFieldValue('name'),
            code: form.getFieldValue('code'),
            discountAmount:
              tempSubmitData.discountType === DiscountTypeEnum.AMOUNT
                ? form.getFieldValue('discountAmount')
                : 0,
            discountPercent:
              tempSubmitData.discountType === DiscountTypeEnum.PERCENT
                ? form.getFieldValue('discountPercent')
                : 0,
            startDate: dayjs(form.getFieldValue('promoDuration')[0]).format('YYYY-MM-DD HH:mm:ss'),
            endDate: dayjs(form.getFieldValue('promoDuration')[1]).format('YYYY-MM-DD HH:mm:ss'),
            description: form.getFieldValue('description'),
            discountType: tempSubmitData.discountType,
            promoType: tempSubmitData.promoType,
          });

          openNotification({
            type: 'success',
            title: 'Promo Created',
            message: 'Promo Berhasil Dibuat!',
          });
        } catch (err: any) {
          openNotification({
            type: 'error',
            title: 'Error',
            message: err?.response.data.message,
          });
        }
        break;
      case FormType.UPDATE:
        try {
          await mutateUpdatePromo(form.getFieldsValue());

          openNotification({
            type: 'success',
            title: 'Promo Created',
            message: 'Promo Berhasil Diupdate!',
          });
        } catch (err: any) {
          openNotification({
            type: 'error',
            title: 'Error',
            message: err?.response.data.message,
          });
        }
        break;
    }
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (formType === FormType.CREATE) {
      form.setFieldsValue(tempSubmitData);
    }

    if (promoData && formType === FormType.UPDATE) {
      form.setFieldsValue({
        ...promoData?.data,
        promoDuration: [dayjs(promoData.data.startDate), dayjs(promoData.data.endDate)],
      });
      setTempSubmitData({
        ...promoData.data,
      });
    }
  }, [promoData]);

  return {
    form,
    promoData,
    handleSubmit,
    mutateCreatePromoIsLoading,
    mutateUpdatePromoIsLoading,
    tempSubmitData,
    handleValuesChanges,
    disableFormBeforePromoType,
  };
};

export default usePromoFormController;
