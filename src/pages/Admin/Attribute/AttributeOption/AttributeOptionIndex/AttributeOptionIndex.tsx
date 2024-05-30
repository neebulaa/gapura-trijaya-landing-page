import usePageEffect from '@/commons/hooks/usePageEffect';
import { RedoOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Input, Row, Space, Table } from 'antd';
import AttributeOptionFormModal from '../AttributeOptionFormModal/AttributeOptionFormModal';
import useAttributeOptionIndexController from './AttributeOptionIndexController';

export default function AttributeOptionIndex() {
  usePageEffect({
    index: false,
    title: `Attribute Options`,
    prevRoute: '/admin/attributes',
  });

  const {
    breadcrumbItem,
    AttributeOptionTableProps,
    // attributeId,
    attributeOptionData,
    attributeOptionDataIsFetching,
    attributeOptionDataRefetch,
    handleTableChange,
    handleSearch,
    modalState,
    handleModalOpen,
    handleModalClose,
    handleModalOk,
    mutateCreateAttributeOptionIsLoading,
    mutateUpdateAttributeOptionIsLoading,
    // mutateDeleteAttributeOptionIsLoading,
  } = useAttributeOptionIndexController();

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <Card>
        <Row className="mb-4">
          <Col md={6} sm={4}>
            <Input placeholder="Search" onChange={(e) => handleSearch(e.target.value)} />
          </Col>
          <Col md={12} className="px-2">
            <Space>
              <Button type="primary" onClick={() => attributeOptionDataRefetch()}>
                <RedoOutlined spin={attributeOptionDataIsFetching} />
              </Button>
            </Space>
          </Col>
          <Col sm={6} md={6} className={'justify-end flex'}>
            <Button type="primary" disabled={false} onClick={() => handleModalOpen('Create')}>
              Add Option
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              scroll={{ x: 700 }}
              bordered={true}
              size="small"
              rowKey={(record) => record.id!}
              columns={AttributeOptionTableProps}
              dataSource={attributeOptionData?.data}
              pagination={{
                total: attributeOptionData?.meta.total,
                current: attributeOptionData?.meta.currentPage,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
                size: 'default',
              }}
              onChange={handleTableChange}
              loading={attributeOptionDataIsFetching}
            />
          </Col>
        </Row>
      </Card>

      <AttributeOptionFormModal
        modalState={modalState}
        handleOk={handleModalOk}
        handleCancel={handleModalClose}
        confirmLoading={mutateCreateAttributeOptionIsLoading || mutateUpdateAttributeOptionIsLoading}
        attributeOption={modalState?.attributeOption}
      />
    </>
  );
}
