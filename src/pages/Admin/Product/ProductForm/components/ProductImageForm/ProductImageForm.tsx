import ResponsiveCol from '@/commons/components/Responsive/ResponsiveCol';
import { ApiImgUrl } from '@/commons/utils/ApiImgUrl';
import useProductImageFormController from '@/pages/Admin/Product/ProductForm/components/ProductImageForm/ProductImageFormController';
import { IProductImage } from '@/types/productImage';
import { DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, Pagination, Popconfirm, Row, Skeleton } from 'antd';
import Dragger from 'antd/es/upload/Dragger';

export default function ProductImageForm() {
  const {
    queryParams,
    productImageData,
    productImageDataIsFetching,
    // productImageDataRefetch,
    handlePageChange,
    handleDeleteProductImage,
    mutateDeleteProductImageIsLoading,
    ProductImageDraggerProps
  } = useProductImageFormController();

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Dragger {...ProductImageDraggerProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Dragger>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-10">
        <Col span={24}>
          {productImageDataIsFetching ? (
            <Skeleton />
          ) : (
            <>
              <Row gutter={[16, 16]}>
                {/*  Map: Product Images */}
                {productImageData?.data?.map((item: IProductImage) => (
                  <ResponsiveCol span={24} md={12} lg={6} key={item.id}>
                    <Card
                      hoverable
                      style={{ width: '100%' }}
                      cover={
                        <Image
                          alt="product-image"
                          style={{
                            width: '100%',
                            height: '15rem',
                            objectFit: 'cover',
                          }}
                          src={ApiImgUrl(item.path)}
                        />
                      }
                      actions={[
                        <Popconfirm
                          title="Yakin Untuk Menghapus?"
                          onConfirm={() => handleDeleteProductImage(item.id!)}
                          placement="top"
                        >
                          <Button
                            type="default"
                            icon={<DeleteOutlined />}
                            loading={mutateDeleteProductImageIsLoading}
                            danger
                          />
                        </Popconfirm>,
                      ]}
                      styles={{
                        body: {
                          padding: '0',
                        },
                      }}
                    ></Card>
                  </ResponsiveCol>
                ))}
              </Row>
              <Pagination
                className="mt-6 float-end"
                defaultCurrent={productImageData?.meta.currentPage}
                total={productImageData?.meta.total}
                pageSize={queryParams.limit}
                showTotal={(total) => `Total ${total} items`}
                // showTotal={(total) => `Showing ${productImageData?.data.length} from ${total} items`}
                onChange={handlePageChange}
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
