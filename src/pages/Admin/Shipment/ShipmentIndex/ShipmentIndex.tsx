import usePageEffect from '@/commons/hooks/usePageEffect';
import useShipmentIndexController from '@/pages/Admin/Shipment/ShipmentIndex/ShipmentIndexController';
import { FilterOutlined, RedoOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Card, Col, Input, Row, Space, Table, Tooltip } from 'antd';

export default function ShipmentIndex() {
  /** Controller */
  const {
    breadcrumbItem,
    TableShipmentProps,
    shipmentData,
    shipmentDataIsFetching,
    shipmentDataIsRefetch,
    handleTableChange,
    handleSearch,
  } = useShipmentIndexController();

  usePageEffect({
    index: true,
    title: `Shipment List`,
  });

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
              <Button type="primary" onClick={() => shipmentDataIsRefetch()}>
                <RedoOutlined spin={shipmentDataIsFetching} />
              </Button>
              {/* bikin tombol trigger muncul filter disini */}
              <Tooltip title="Filter" placement="right">
                <Button type="primary" onClick={() => console.log('search')}>
                  <FilterOutlined />
                </Button>
              </Tooltip>
            </Space>
          </Col>
          {/* <Col sm={6} md={6} className={'justify-end flex'}>
            <ToggleableLink to={'/admin/orders/create'} disabled={false}>
              <Button type="primary" disabled={false}>
                Add Category
              </Button>
            </ToggleableLink>
          </Col> */}
        </Row>
        <Row>
          <Col span={24}>
            <Table
              scroll={{ x: 700 }}
              bordered={true}
              size="small"
              rowKey={(record) => record.id!}
              columns={TableShipmentProps}
              dataSource={shipmentData?.data}
              pagination={{
                total: shipmentData?.meta.total,
                current: shipmentData?.meta.currentPage,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
                size: 'default',
              }}
              onChange={handleTableChange}
              loading={shipmentDataIsFetching}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}
