import React from 'react';
import { FormType, IFormProps } from '@/types/global/form.ts';
import usePageEffect from '@/commons/hooks/usePageEffect.tsx';
import usePromoFormController from '@/pages/Admin/Promo/PromoForm/PromoFormController.tsx';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Card, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol.tsx';
import { DiscountTypeEnum, PromoTypeEnum } from '@/types/promo.ts';

const PromoForm = (props: IFormProps) => {
  /**
   * Props
   */
  const { formType } = props;

  /**
   * Handle Breadcrumb
   */
  const breadcrumbItem = [
    { title: 'Home' },
    { title: <Link to="/admin/promos">Promo List</Link> },
    { title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Promo` },
  ];

  /**
   * Handle Page Title
   */
  usePageEffect({
    index: true,
    title: `${formType === 'CREATE' ? 'Add' : 'Edit'} Promo`,
    docTitle: `${formType === 'CREATE' ? 'Add' : 'Edit'} Promo`,
  });

  const {
    form,
    handleSubmit,
    mutateCreatePromoIsLoading,
    mutateUpdatePromoIsLoading,
    tempSubmitData,
    handleValuesChanges,
    disableFormBeforePromoType,
  } = usePromoFormController(props);

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChanges}
      >
        <Card>
          <Row gutter={24}>
            <ResponsiveCol md={24}>
              <Form.Item label="Tipe Promo" name="promoType" rules={[{ required: true }]}>
                <Select
                  className="w-full"
                  placeholder="Tipe Promo"
                  filterOption={false}
                  options={Object.entries(PromoTypeEnum).map(([_, value]) => ({
                    value: value,
                    label: value === PromoTypeEnum.QTY ? 'Quantity' : 'Coupon Code',
                  }))}
                />
              </Form.Item>
            </ResponsiveCol>

            <ResponsiveCol hidden={tempSubmitData.promoType !== PromoTypeEnum.CODE}>
              <Form.Item
                label="Kode Promo"
                name="code"
                rules={[{ required: tempSubmitData.promoType === PromoTypeEnum.CODE }]}
                hidden={tempSubmitData.promoType !== PromoTypeEnum.CODE}
              >
                <Input placeholder={'Kode Promo'} disabled={disableFormBeforePromoType} />
              </Form.Item>
            </ResponsiveCol>

            <ResponsiveCol>
              <Form.Item label="Nama Promo" name="name" rules={[{ required: true }]}>
                <Input placeholder={'Nama Promo'} disabled={disableFormBeforePromoType} />
              </Form.Item>
            </ResponsiveCol>

            <ResponsiveCol>
              <Form.Item label="Tipe Diskon" name="discountType" rules={[{ required: true }]}>
                <Select
                  className="w-full"
                  placeholder="Tipe Diskon"
                  filterOption={false}
                  options={Object.entries(DiscountTypeEnum).map(([_, value]) => ({
                    value: value,
                    label: value === DiscountTypeEnum.AMOUNT ? 'Nilai' : 'Persen',
                  }))}
                  disabled={disableFormBeforePromoType}
                />
              </Form.Item>
            </ResponsiveCol>

            <ResponsiveCol>
              <Form.Item
                label="Nilai Diskon"
                name="discountAmount"
                rules={[{ required: tempSubmitData.discountType === DiscountTypeEnum.AMOUNT }]}
                hidden={tempSubmitData.discountType !== DiscountTypeEnum.AMOUNT}
              >
                <InputNumber
                  min={0}
                  className={'w-full'}
                  placeholder={'Nilai Diskon'}
                  prefix={'Rp. '}
                  formatter={(value) => {
                    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                  }}
                  disabled={disableFormBeforePromoType}
                />
              </Form.Item>

              <Form.Item
                label="Nilai Diskon"
                name="discountPercent"
                rules={[{ required: tempSubmitData.discountType === DiscountTypeEnum.PERCENT }]}
                hidden={tempSubmitData.discountType !== DiscountTypeEnum.PERCENT}
              >
                <InputNumber
                  min={0}
                  className={'w-full'}
                  placeholder={'Nilai Diskon'}
                  suffix={'%'}
                  disabled={disableFormBeforePromoType}
                />
              </Form.Item>
            </ResponsiveCol>

            <ResponsiveCol>
              <Form.Item label="Durasi Promo" name="promoDuration" rules={[{ required: true }]}>
                <DatePicker.RangePicker className={'w-full'} showTime />
              </Form.Item>
            </ResponsiveCol>

            <ResponsiveCol>
              <Form.Item label="Deskripsi" name="description">
                <Input.TextArea className={'w-full'} placeholder={'Deskripsi'} />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => handleSubmit()}
              loading={mutateCreatePromoIsLoading || mutateUpdatePromoIsLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
};

export default PromoForm;
