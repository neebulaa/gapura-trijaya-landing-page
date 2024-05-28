import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol.tsx';
import usePageEffect from '@/commons/hooks/usePageEffect.tsx';
import ToggleableLink from '@/commons/utils/ToggleableLink.tsx';
import { FormType, IFormProps } from '@/types/global/form.ts';
import { Breadcrumb, Button, Card, Col, Divider, Form, Input, Row, Select, Space } from 'antd';
import { useAttributeFormController } from './AttributeFormController';
import { AttributeTypeEnum, BooleanOptionsEnum, ValidationEnum } from '@/types/enum/attribute.enum';

export default function AttributeForm(props: IFormProps) {
  const { formType } = props;

  usePageEffect({
    index: false,
    title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Attribute`,
    prevRoute: -1,
  });

  const {
    form,
    breadcrumbItem,
    handleSubmit,
    mutateCreateAttributeIsLoading,
    mutateUpdateAttributeIsLoading,
  } = useAttributeFormController(props);

  // Helper function untuk mengonversi enum ke options
  const getBooleanOptions = () => {
    return Object.keys(BooleanOptionsEnum)
      .filter((key) => isNaN(Number(key))) // Mengabaikan nilai numeric keys
      .map((key) => ({
        value: BooleanOptionsEnum[key as keyof typeof BooleanOptionsEnum],
        label: key,
      }));
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Form form={form} autoComplete="off" layout="vertical">
        <Card>
          <Divider orientation="left" plain orientationMargin="0">
            General
          </Divider>
          <Row gutter={24}>
            <ResponsiveCol>
              <Form.Item label="Code" name="code" rules={[{ required: true }]}>
                <Input placeholder="Code" />
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
              <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                <Select
                  showSearch
                  allowClear
                  style={{ width: '100%' }}
                  // filterOption={false}
                  optionLabelProp="label"
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Type select"
                  options={(Object.values(AttributeTypeEnum) as string[]).map((type) => ({
                    value: type,
                    label: type.charAt(0).toUpperCase() + type.slice(1),
                  }))}
                />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Divider orientation="left" plain orientationMargin="0">
            Validation
          </Divider>
          <Row gutter={24}>
            <ResponsiveCol>
              <Form.Item label="Is Required" name="isRequired" rules={[{ required: true }]}>
                {/* <Input placeholder="Is Required" /> */}
                <Select
                  showSearch
                  allowClear
                  style={{ width: '100%' }}
                  // filterOption={false}
                  optionLabelProp="label"
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Is required select"
                  options={getBooleanOptions()}
                />
              </Form.Item>
            </ResponsiveCol>
            <ResponsiveCol>
              <Form.Item label="Is Unique" name="isUnique" rules={[{ required: true }]}>
                <Select
                  showSearch
                  allowClear
                  style={{ width: '100%' }}
                  // filterOption={false}
                  optionLabelProp="label"
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Is unique select"
                  options={getBooleanOptions()}
                />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Row gutter={24}>
            <ResponsiveCol>
              <Form.Item label="Validation" name="validation" rules={[{ required: false }]}>
                <Select
                  showSearch
                  allowClear
                  style={{ width: '100%' }}
                  // filterOption={false}
                  optionLabelProp="label"
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Validation select"
                  options={(Object.values(ValidationEnum) as string[]).map((type) => ({
                    value: type,
                    label: type.charAt(0).toUpperCase() + type.slice(1),
                  }))}
                />
              </Form.Item>
            </ResponsiveCol>
          </Row>
          <Divider orientation="left" plain orientationMargin="0">
            Configuration
          </Divider>
          <Row gutter={24}>
            <ResponsiveCol>
              <Form.Item
                label="Use In Configurable Product"
                name="isConfigurable"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  allowClear
                  style={{ width: '100%' }}
                  // filterOption={false}
                  optionLabelProp="label"
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Is configurable select"
                  options={getBooleanOptions()}
                />
              </Form.Item>
            </ResponsiveCol>
            <ResponsiveCol>
              <Form.Item
                label="Use In Filtering Product"
                name="isFilterable"
                rules={[{ required: true }]}
              >
                <Select
                  showSearch
                  allowClear
                  style={{ width: '100%' }}
                  // filterOption={false}
                  optionLabelProp="label"
                  dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                  placeholder="Is filterable select"
                  options={getBooleanOptions()}
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
                      ? mutateCreateAttributeIsLoading
                      : mutateUpdateAttributeIsLoading
                  }
                >
                  {/* Save */}
                  {formType == FormType.CREATE ? 'Save' : 'Update'}
                </Button>
                <ToggleableLink to={`/admin/attributes`}>
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
