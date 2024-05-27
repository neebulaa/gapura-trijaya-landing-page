import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import useCategoryFormController from '@/pages/Admin/Category/CategoryForm/CategoryFormController.tsx';
import ToggleableLink from '@/commons/utils/ToggleableLink.tsx';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol.tsx';
import { FormType, IFormProps } from '@/types/global/form.ts';
import usePageEffect from '@/commons/hooks/usePageEffect.tsx';

export default function CategoryForm(props: IFormProps) {
  const { formType } = props;

  usePageEffect({
    index: false,
    title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Category`,
    prevRoute: -1,
  });

  const {
    form,
    breadcrumbItem,
    categoryParentData,
    handleCategoryParentSearch,
    handleSubmit,
    mutateCreateCategoryIsLoading,
    mutateUpdateCategoryIsLoading,
  } = useCategoryFormController(props);

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
                label="Parent"
                name="parent"
                rules={[{ required: false }]}
              >
                <Select
                  showSearch
                  placeholder="Parent"
                  filterOption={false}
                  optionLabelProp="label"
                  onSearch={handleCategoryParentSearch}
                  options={(categoryParentData?.data || []).map((d) => ({
                    value: d.id,
                    label: d.name,
                  }))}
                />
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
                      ? mutateCreateCategoryIsLoading
                      : mutateUpdateCategoryIsLoading
                  }
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
