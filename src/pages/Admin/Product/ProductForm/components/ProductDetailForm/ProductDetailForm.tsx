import FormItem from '@/commons/components/Form/FormItem';
import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol.tsx';
import usePageEffect from '@/commons/hooks/usePageEffect.tsx';
import ToggleableLink from '@/commons/utils/ToggleableLink.tsx';
import useProductDetailFormController from '@/pages/Admin/Product/ProductForm/components/ProductDetailForm/ProductDetailFormController';
import ProductConfigurableForm from '@/pages/Admin/Product/components/reusable/ProductConfigurableForm';
import ProductSimpleForm from '@/pages/Admin/Product/ProductForm/components/reusable/ProductSimpleFrom';
import { FormType, IFormProps } from '@/types/global/form.ts';
import { Button, Col, Divider, Form, Input, Row, Select, Skeleton, Space } from 'antd';
import { useState } from 'react';

export default function ProductDetailForm(props: IFormProps) {
  const { formType } = props;

  const [isConfigurable, setIsConfigurable] = useState<boolean>(false);

  usePageEffect({
    index: false,
    title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Product`,
    prevRoute: -1,
  });

  const {
    form,
    // breadcrumbItem,
    productData,
    productDataIsFetching,
    // productDataRefetch,
    categoryData,
    handleCategorySearch,
    handleSubmit,
    mutateCreateProductIsLoading,
    mutateUpdateProductIsLoading,
    attributeData,
    validationErrors,
  } = useProductDetailFormController(props);

  return (
    <>
      {/* <Breadcrumb items={breadcrumbItem} /> */}
      <Form form={form} autoComplete="off" layout="vertical" className="mb-10">
        {/* <Card> */}
        {productDataIsFetching ? (
          <Skeleton />
        ) : (
          <>
            <Divider orientation="left" plain orientationMargin="0">
              General
            </Divider>
            <Row gutter={24}>
              <ResponsiveCol>
                <Form.Item
                  label="Type"
                  name="type"
                  rules={[{ required: formType === FormType.UPDATE ? false : true }]}
                >
                  <Select
                    showSearch
                    allowClear
                    style={{ width: '100%' }}
                    // filterOption={false}
                    optionLabelProp="label"
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    placeholder="Type select"
                    // defaultValue="simple"
                    disabled={formType === FormType.UPDATE ? true : false}
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
                    onChange={(e) => {
                      if (e == 'configurable') {
                        setIsConfigurable(true);
                      } else {
                        setIsConfigurable(false);
                      }
                    }}
                  />
                </Form.Item>
              </ResponsiveCol>
              <ResponsiveCol>
                <FormItem
                  label="SKU"
                  name="sku"
                  rules={[{ required: true }]}
                  validationErrors={validationErrors}
                >
                  <Input placeholder="SKU" />
                </FormItem>
              </ResponsiveCol>
            </Row>
            <Row gutter={24}>
              <ResponsiveCol>
                <FormItem
                  label="Name"
                  name="name"
                  rules={[{ required: true }]}
                  validationErrors={validationErrors}
                >
                  <Input placeholder="Name" />
                </FormItem>
              </ResponsiveCol>
              <ResponsiveCol>
                <Form.Item label="Categories" name="categories" rules={[{ required: true }]}>
                  <Select
                    mode="multiple"
                    showSearch
                    allowClear
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
                  />
                </Form.Item>
              </ResponsiveCol>
            </Row>
            {/* TODO: form attributes for configurable product */}
            {isConfigurable && formType !== FormType.UPDATE && (
              <>
                <Divider orientation="left" plain orientationMargin="0">
                  Configurable Attributes
                </Divider>
                <Row gutter={24}>
                  {attributeData?.data?.map((d) => (
                    <ResponsiveCol key={d.id}>
                      {/* <Form.Item label={d.name} name={`attribute_${d.code}`} rules={[{ required: false }]}> */}
                      <Form.Item
                        label={d.name}
                        name={`${d.code}`}
                        rules={[{ required: Boolean(d.isRequired) }]}
                      >
                        <Select
                          mode="multiple"
                          showSearch
                          allowClear
                          placeholder="Attribute select"
                          filterOption={false}
                          optionLabelProp="label"
                          style={{ width: '100%' }}
                          dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
                          options={d.options.map((o) => ({
                            value: o.id,
                            label: o.name,
                          }))}
                        />
                      </Form.Item>
                    </ResponsiveCol>
                  ))}
                </Row>
              </>
            )}
            {/*  */}
            {formType === FormType.UPDATE && (
              <>
                {productData?.data?.type === 'configurable' ? (
                  <ProductConfigurableForm
                    validationErrors={validationErrors}
                    productData={productData?.data}
                  />
                ) : (
                  <ProductSimpleForm validationErrors={validationErrors} />
                )}
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
                      <Input.TextArea placeholder="Short Description" rows={3} />
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
                <Row gutter={24}>
                  <ResponsiveCol lg={24}>
                    <Form.Item label="Status" name="status" rules={[{ required: true }]}>
                      <Select
                        showSearch
                        style={{ width: '100%' }}
                        // defaultValue={1}
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
              </>
            )}

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
          </>
        )}
        {/* </Card> */}
      </Form>
    </>
  );
}
