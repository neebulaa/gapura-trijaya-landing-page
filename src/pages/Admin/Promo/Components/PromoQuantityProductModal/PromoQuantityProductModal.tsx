import React from 'react';
import { PromoQuantityProductModalProps } from '@/pages/Admin/Promo/Interfaces/PromoQuantityProductModalProps.ts';
import { Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol.tsx';
import usePromoQuantityProductModalController from '@/pages/Admin/Promo/Components/PromoQuantityProductModal/PromoQuantityProductModalController.tsx';
import { FormType } from '@/types/global/form.ts';

const PromoQuantityProductModal = (props: PromoQuantityProductModalProps) => {
  /**
   * Props
   */
  const { isOpen, tempDetails, type } = props;

  /**
   * Controller
   */
  const { form, productsData, handleModalOk, handleModalCancel, handleSearchProducts } =
    usePromoQuantityProductModalController(props);

  return (
    <Modal
      title={`${type === FormType.CREATE ? 'Tambah' : 'Edit'} Product`}
      centered
      width={'50%'}
      open={isOpen}
      onCancel={() => handleModalCancel()}
      onOk={() => handleModalOk()}
    >
      <Form form={form} layout="vertical">
        <Row gutter={24}>
          <Form.Item name={'id'} hidden>
            <Input />
          </Form.Item>

          <ResponsiveCol>
            <Form.Item name={'productName'} label={'Product'} hidden={type === FormType.CREATE}>
              <Input readOnly />
            </Form.Item>

            <Form.Item
              name={'productId'}
              label={'Product'}
              rules={[{ required: true }]}
              hidden={type === FormType.UPDATE}
            >
              <Select
                placeholder={'Product'}
                showSearch
                filterOption={false}
                onSearch={handleSearchProducts}
                options={productsData?.data.map((product) => ({
                  label: product.name,
                  value: product.id,
                  disabled: tempDetails?.some((detail) => detail.productId === product.id),
                }))}
              />
            </Form.Item>
          </ResponsiveCol>

          <ResponsiveCol>
            <Form.Item name={'qty'} label={'Qty'} rules={[{ required: true }]}>
              <InputNumber placeholder={'Qty'} className={'w-full'} min={1} />
            </Form.Item>
          </ResponsiveCol>
        </Row>
      </Form>
    </Modal>
  );
};

export default PromoQuantityProductModal;
