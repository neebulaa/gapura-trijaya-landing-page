import React from 'react';
import usePromoIndexController from '@/pages/Admin/Promo/PromoIndex/PromoIndexController.tsx';
import usePageEffect from '@/commons/hooks/usePageEffect.tsx';
import { Breadcrumb, Button, Card, Col, Input, Row, Space, Table } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import ToggleableLink from '@/commons/utils/ToggleableLink.tsx';

const PromoIndex = () => {
  /**
   * Controller
   */
  const {
    handleSearch,
    promoData,
    promoDataIsFetching,
    promoDataRefetch,
    PromoTableProps,
    handleTableChange,
  } = usePromoIndexController();

  /**
   * Handle Breadcrumb
   */
  const breadcrumbItem = [{ title: 'Home' }, { title: 'Promo List' }];

  /**
   * Handle Page Title
   */
  usePageEffect({
    index: true,
    title: 'Promo List',
    docTitle: 'Promo List',
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
              <Button type="primary" onClick={() => promoDataRefetch()}>
                <RedoOutlined spin={promoDataIsFetching} />
              </Button>
            </Space>
          </Col>
          <Col sm={6} md={6} className={'justify-end flex'}>
            <ToggleableLink to={'/admin/promos/create'} disabled={false}>
              <Button type="primary" disabled={false}>
                Add Promo
              </Button>
            </ToggleableLink>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              scroll={{ x: 700 }}
              bordered={true}
              size="small"
              rowKey={(record) => record.id!}
              columns={PromoTableProps}
              dataSource={promoData?.data}
              pagination={{
                total: promoData?.meta.total,
                current: promoData?.meta.currentPage,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
                size: 'default',
              }}
              onChange={handleTableChange}
              loading={promoDataIsFetching}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default PromoIndex;
