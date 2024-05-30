import { Form, Input, Modal, Row } from 'antd';
import { IAttributeOptionModal } from '@/pages/Admin/Attribute/AttributeOption/interface/attributeOptionModal.interface';
import useAttributeOptionFormModal from '@/pages/Admin/Attribute/AttributeOption/AttributeOptionFormModal/AttributeOptionFormModalController';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';

export default function AttributeOptionFormModal(props: IAttributeOptionModal) {
  /**
   * Props
   */
  const { modalState, confirmLoading } = props;

  /**
   * Controller
   */
  const { form, handleModalOk, handleModalCancel} =
    useAttributeOptionFormModal(props);

  return (
    <>
      <Modal
        confirmLoading={confirmLoading}
        title={`${modalState?.formMode} Attribute Option`}
        open={modalState?.isOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
      >
        <Form form={form} autoComplete="off" layout="vertical">
          <Row gutter={24}>
            <ResponsiveCol lg={24}>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Name" />
              </Form.Item>
            </ResponsiveCol>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
