import React, { useEffect, useMemo, useState } from 'react';
import { FormType, IFormProps } from '@/types/global/form.ts';
import { useOutletContext, useParams } from 'react-router-dom';
import { OutletContextInterface } from '@/types/global/outletContext.ts';
import {
  useCreatePromo,
  useGetPromo,
  useUpdatePromo,
} from '@/services/queries/admin/promo.query.ts';
import { Form, Space } from 'antd';
import {
  CreatePromoDetailDto,
  CreatePromoDto,
  DiscountTypeEnum,
  PromoTypeEnum,
  UpdatePromoDetailDto,
  UpdatePromoDto,
} from '@/types/promo.ts';
import { debounce } from '@/commons/utils/Debounce.ts';
import dayjs from 'dayjs';
import { PromoQuantityProductModalProps } from '@/pages/Admin/Promo/Interfaces/PromoQuantityProductModalProps.ts';
import { ColumnsType } from 'antd/lib/table';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import ActionButton from '@/commons/components/Button/ActionButton.tsx';

const usePromoFormController = (props: IFormProps) => {
  const { formType } = props;

  const { openNotification } = useOutletContext<OutletContextInterface>();
  // const navigate = useNavigate();

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
    promoDetails: [],
  });
  const [productModalProps, setProductModalProps] = useState<PromoQuantityProductModalProps>({
    isOpen: false,
  });

  /**
   * Handle Modal
   */
  const handleModal = (
    action: 'open' | 'close' | 'submit',
    data?: CreatePromoDetailDto | UpdatePromoDetailDto,
    type: FormType = FormType.CREATE,
  ) => {
    switch (action) {
      case 'open':
        setProductModalProps({
          isOpen: true,
          type: type,
          data: data,
        });
        break;
      case 'close':
        setProductModalProps({
          isOpen: false,
          data: undefined,
        });
        break;
      case 'submit':
        setProductModalProps({
          isOpen: false,
          data: undefined,
        });

        const details = tempSubmitData.promoDetails ?? [];
        if (type === FormType.CREATE) {
          (details as CreatePromoDetailDto[]).push(data as CreatePromoDetailDto);

          setTempSubmitData({
            ...tempSubmitData,
            promoDetails: details,
          });
        }

        if (type === FormType.UPDATE) {
          const updatedDetails = (details as UpdatePromoDetailDto[]).map((detail) => {
            if (detail.productId === data?.productId) {
              return data as UpdatePromoDetailDto;
            }
            return detail;
          });

          setTempSubmitData({
            ...tempSubmitData,
            promoDetails: updatedDetails,
          });
        }
        break;
    }
  };

  /**
   * Handle Delete Detail
   */
  const handleDeleteDetail = (productId: string) => {
    const details = tempSubmitData.promoDetails ?? [];
    const updatedDetails = details.filter((detail) => detail.productId !== productId);

    setTempSubmitData({
      ...tempSubmitData,
      promoDetails: updatedDetails,
    });
  };

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
    return !tempSubmitData?.promoType;
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
            promoDetails: (tempSubmitData.promoDetails as CreatePromoDetailDto[]).map((detail) => ({
              productId: detail.productId,
              qty: detail.qty,
            })),
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
          await mutateUpdatePromo({
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
            promoDetails: (tempSubmitData.promoDetails as UpdatePromoDetailDto[]).map((detail) => ({
              ...(detail.id ? { id: detail.id } : {}),
              productId: detail.productId,
              qty: detail.qty,
            })),
          });

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
   * Detail Table Props
   */
  const detailTableProps: ColumnsType<CreatePromoDetailDto | UpdatePromoDetailDto> = [
    {
      title: 'Nama Produk',
      key: 'product',
      render: (_, record) => record?.product?.name,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: '10%',
      render: (_, record) => (
        <Space direction={'horizontal'} size={1}>
          <ActionButton
            icon={<EditOutlined />}
            hoverMessage="Edit"
            status="warning"
            type="default"
            onClick={() => handleModal('open', record, FormType.UPDATE)}
          />

          <ActionButton
            icon={<DeleteOutlined />}
            hoverMessage="Delete"
            status="danger"
            type="default"
            danger={true}
            onClick={() => handleDeleteDetail(record.productId!)}
          />
        </Space>
      ),
    },
  ];

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
        promoDetails: promoData.data.promoDetails ?? [],
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
    handleModal,
    productModalProps,
    detailTableProps,
  };
};

export default usePromoFormController;
