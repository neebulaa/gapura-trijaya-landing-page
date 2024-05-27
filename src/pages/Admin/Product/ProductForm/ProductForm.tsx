import { Breadcrumb, Button, Card, Col, Form, Input, Row, Space } from 'antd';
import useProductFormController from '@/pages/Admin/Product/ProductForm/ProductFormController.tsx';
import ToggleableLink from '@/commons/utils/ToggleableLink.tsx';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol.tsx';
import { FormType, IFormProps } from '@/types/global/form.ts';
import usePageEffect from '@/commons/hooks/usePageEffect.tsx';

export default function ProductForm(props: IFormProps) {
  const { formType } = props;

  usePageEffect({
    index: false,
    title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Product`,
    prevRoute: -1,
  });

  const {
    form,
    breadcrumbItem,
    handleSubmit,
    mutateCreateProductIsLoading,
    mutateUpdateProductIsLoading,
  } = useProductFormController(props);

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
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: false }]}
              >
                <Input.TextArea placeholder="Description" />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Row gutter={24} className="mt-2">
            <Col md={24}>
              <Space>
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  loading={
                    formType == FormType.CREATE
                      ? mutateCreateProductIsLoading
                      : mutateUpdateProductIsLoading
                  }
                >
                  {formType == FormType.CREATE ? 'Save' : 'Update'}
                </Button>
                <ToggleableLink to={`/admin/products`}>
                  <Button type="default">Back</Button>
                </ToggleableLink>
              </Space>
            </Col>
          </Row>
        </Card>
      </Form>
    </>
  );
}
