import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  TreeSelect,
} from 'antd';
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
    //Category
    categoryData,
    handleCategorySearch,
    //Product
    handleSubmit,
    mutateCreateProductIsLoading,
    mutateUpdateProductIsLoading,
  } = useProductFormController(props);

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Form form={form} autoComplete="off" layout="vertical" className="mb-10">
        <Card>
          <Divider orientation="left" plain orientationMargin="0">
            General
          </Divider>
          <Row gutter={24}>
            <ResponsiveCol>
              <Form.Item label="SKU" name="sku" rules={[{ required: true }]}>
                <Input placeholder="SKU" />
              </Form.Item>
            </ResponsiveCol>
            <ResponsiveCol>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Name" />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Row gutter={24}>
            <ResponsiveCol>
              <Form.Item label="Price" name="price" rules={[{ required: true }]}>
                <Input placeholder="Price" />
              </Form.Item>
            </ResponsiveCol>
            <ResponsiveCol>
              <Form.Item label="Categories" name="categories" rules={[{ required: true }]}>
                <Select
                  mode="multiple"
                  showSearch
                  placeholder="Category select"
                  filterOption={false}
                  optionLabelProp="label"
                  style={{ width: '100%' }}
                  dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
                  onSearch={handleCategorySearch}
                  options={(categoryData?.data || []).map((d) => ({
                    value: d.id,
                    label: d.name,
                  }))}
                  allowClear
                  // onChange={onChange}
                  // treeData={treeData}
                  // onPopupScroll={onPopupScroll}
                />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Divider orientation="left" plain orientationMargin="0">
            Dimension
          </Divider>
          <Row gutter={24}>
            <ResponsiveCol>
              <Form.Item label="Weight" name="weight" rules={[{ required: true }]}>
                <InputNumber
                  min={0}
                  max={100}
                  defaultValue={0}
                  placeholder="Weight"
                  className="w-full"
                />
              </Form.Item>
            </ResponsiveCol>
            <ResponsiveCol>
              <Form.Item label="Width" name="width" rules={[{ required: true }]}>
                <InputNumber
                  min={0}
                  max={100}
                  defaultValue={0}
                  placeholder="Width"
                  className="w-full"
                />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Row gutter={24}>
            <ResponsiveCol>
              <Form.Item label="Height" name="height" rules={[{ required: true }]}>
                <InputNumber
                  min={0}
                  max={100}
                  defaultValue={0}
                  placeholder="Height"
                  className="w-full"
                />
              </Form.Item>
            </ResponsiveCol>
            <ResponsiveCol>
              <Form.Item label="Length" name="length" rules={[{ required: true }]}>
                <InputNumber
                  min={0}
                  max={100}
                  defaultValue={0}
                  placeholder="Length"
                  className="w-full"
                />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Divider orientation="left" plain orientationMargin="0">
            Description
          </Divider>
          <Row gutter={24}>
            <ResponsiveCol lg={24}>
              <Form.Item
                label="Short Description"
                name="shortDescription"
                rules={[{ required: false }]}
              >
                <Input.TextArea placeholder="shortDescription" rows={3} />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Row gutter={24}>
            <ResponsiveCol lg={24}>
              <Form.Item label="Description" name="description" rules={[{ required: false }]}>
                <Input.TextArea placeholder="Description" rows={5} />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Divider orientation="left" plain orientationMargin="0">
            Configuration
          </Divider>
          <Row gutter={24}>
            <ResponsiveCol lg={24}>
              <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  // filterOption={false}
                  // optionLabelProp="label"
                  defaultValue="simple"
                  options={[
                    {
                      value: 'simple',
                      label: 'Simple',
                    },
                    {
                      value: 'configurable',
                      label: 'Configurable',
                    },
                  ]}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Type select"
                  allowClear
                />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          {/* TODO: form attributes for configurable product */}
          {/*  */}
          <Row gutter={24}>
            <ResponsiveCol lg={24}>
              <Form.Item label="Status" name="status" rules={[{ required: true }]}>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  defaultValue={1}
                  options={[
                    {
                      value: 0,
                      label: 'Draft',
                    },
                    {
                      value: 1,
                      label: 'Active',
                    },
                    {
                      value: 2,
                      label: 'Inactive',
                    },
                  ]}
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Status select"
                  allowClear
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
