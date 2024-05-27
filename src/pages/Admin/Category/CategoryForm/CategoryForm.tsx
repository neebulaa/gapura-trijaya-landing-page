import { Breadcrumb, Button, Card, Col, Form, Input, Row, Space } from 'antd';
import useCategoryFormController from '@/pages/Admin/Category/CategoryForm/CategoryFormController.tsx';
import ToggleableLink from '@/commons/utils/ToggleableLink.tsx';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol.tsx';
import { FormType, IFormProps } from '@/types/global/form.ts';

export default function CategoryForm(props: IFormProps) {
  const { formType } = props;

  const { form, breadcrumbItem } = useCategoryFormController(props);

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Form form={form} autoComplete="off" layout="vertical">
        <Card>
          <Row gutter={24}>
            <ResponsiveCol>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Name" />
              </Form.Item>
            </ResponsiveCol>
            <ResponsiveCol>
              <Form.Item label="Parent" name="parent" rules={[{ required: false }]}>
                <Input placeholder="Parent" />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Row gutter={24}>
            <Col md={24}>
              <Space>
                <Button
                  type="primary"
                  onClick={(e) => console.log('submit')}
                  // loading={
                  //   formType == FormType.CREATE
                  //     ? mutateCreateProductIsLoading
                  //     : mutateEditProductIsLoading
                  // }
                >
                  {/* Simpan */}
                  {formType == FormType.CREATE ? 'Simpan' : 'Update'}
                </Button>
                <ToggleableLink to={`/admin/categories`}>
                  <Button type="default">Kembali</Button>
                </ToggleableLink>
              </Space>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
}