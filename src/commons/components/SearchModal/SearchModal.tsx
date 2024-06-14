import React, { useEffect, useState } from 'react';
import useSearchModal from '@/commons/store/useSearchModal.ts';
import { Col, Form, Input, List, Modal, Row, Skeleton, Space } from 'antd';
import { QueryParams } from '@/types/base.ts';
import { useGetProducts } from '@/services/queries/product.query.ts';
import IconSearch from '@/commons/assets/icons/IconSearch.tsx';
import { debounce } from '@/commons/utils/Debounce.ts';
import { Link } from 'react-router-dom';
import useScreenSize from '@/commons/store/useScreenSize.ts';
import usePublicSidebar from '@/commons/store/usePublicSidebar.ts';

const SearchModal = () => {
  const { isOpen, toggle: toggleSearchModal } = useSearchModal((state) => state);

  /**
   * Get Products
   */
  const [productQueryParams, setProductQueryParams] = useState<QueryParams>({
    page: 1,
    limit: 5,
    search: '',
  });

  const { data: productsData, isFetching: productsDataIsFetching } = useGetProducts(
    productQueryParams,
    productQueryParams.search !== '',
  );

  const [form] = Form.useForm();

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
      setProductQueryParams({ ...productQueryParams, search: '' });
    }
  }, [isOpen]);

  const { isMobile } = useScreenSize();
  const { setOpenSidebar } = usePublicSidebar();

  return (
    <Modal
      width={isMobile ? '100%' : '40%'}
      centered={false}
      open={isOpen}
      footer={false}
      closable={false}
      maskClosable={true}
      onCancel={() => {
        toggleSearchModal();
        setOpenSidebar(true);
      }}
    >
      <Row>
        <Col md={24} xs={24} className={'mb-2'}>
          <Form form={form}>
            <Form.Item className={'m-0'} name={'search'}>
              <Input
                type="text"
                className="tj-input"
                placeholder={'Search'}
                prefix={<IconSearch width="20" height="20" className="ml-1" />}
                onChange={debounce((e: any) => {
                  setProductQueryParams({ ...productQueryParams, search: e.target.value });
                })}
              />
            </Form.Item>
          </Form>
        </Col>

        {productsDataIsFetching ? (
          <Col md={24} xs={24} className={'mb-2'}>
            <Space direction={'vertical'} size={'small'} className={'w-full'}>
              <Skeleton active paragraph={false} />
              <Skeleton active paragraph={false} />
              <Skeleton active paragraph={false} />
              <Skeleton active paragraph={false} />
              <Skeleton active paragraph={false} />
            </Space>
          </Col>
        ) : null}

        {productsData && !productsDataIsFetching ? (
          <>
            <Col md={24} xs={24}>
              <List
                size="small"
                bordered
                dataSource={productsData?.data}
                renderItem={(item) => (
                  <div className={'search-list'}>
                    <Link to={`/shop/${item.slug}`} onClick={() => toggleSearchModal()}>
                      <List.Item>{item.name}</List.Item>
                    </Link>
                  </div>
                )}
              />
            </Col>
          </>
        ) : null}
      </Row>
    </Modal>
  );
};

export default SearchModal;
