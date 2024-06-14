import { getCookie } from '@/commons/lib/cookieStorage';
import {
  useDeleteProductImage,
  useGetProductImages,
  useUploadProductImage,
} from '@/services/queries/admin/product.image.query';
import { QueryParams, sortBy } from '@/types/base';
import { OutletContextInterface } from '@/types/global/outletContext';
import { UploadProps, message } from 'antd';
import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';

export default function useProductImageFormController() {
  const { openNotification } = useOutletContext<OutletContextInterface>();

  /**
   * Params
   */
  const { id } = useParams(); //productId

  /**
   * State
   */
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: 1,
    limit: 12,
    orderBy: 'id',
    sortBy: sortBy.DESC,
  });

  /**
   * Query Model: Product Images
   */
  const {
    data: productImageData,
    isFetching: productImageDataIsFetching,
    refetch: productImageDataRefetch,
  } = useGetProductImages(queryParams, id!);

  /**
   * Mutation: Delete Product Image
   */
  const { mutateAsync: mutateDeleteProductImage, isPending: mutateDeleteProductImageIsLoading } =
    useDeleteProductImage();

  /** Mutation: Upload Product Image */
  const { mutateAsync: mutateUploadProductImage, isPending: mutateUploadProductImageIsLoading } =
    useUploadProductImage(id!);

  /**
   * Handle: Page Change
   */
  const handlePageChange = (page: number) => {
    setQueryParams({
      ...queryParams,
      page: page,
    });
  };

  /**
   * Handle: Upload Product Image Dragger
   */
  const ProductImageDraggerProps: UploadProps = {
    name: 'image',
    multiple: false,
    onRemove: (file) => {
      console.log('file: ', file);
    },
    // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    // action: `${import.meta.env.VITE_API_URL}v1/admin/products/images/${id}`,
    customRequest: ({ file }) => {
      const formData = new FormData();
      formData.append('image', file);

      fetch(`${import.meta.env.VITE_API_URL}v1/admin/products/images/${id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getCookie('token')}`,
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((_res) => {
          // onSuccess(res, file);
          productImageDataRefetch();
          message.success(`File uploaded successfully.`);
        })
        .catch((err) => {
          console.log('err: ', err);
        });
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    showUploadList: false,
  };

  /**
   * Handle: Delete Product Image
   */
  const handleDeleteProductImage = async (id: string) => {
    // console.log('delete: ', id);
    await mutateDeleteProductImage(id)
      .then((res) => {
        openNotification({
          title: 'Sukses',
          message: res.message as string,
          type: 'success',
        });
      })
      .catch((err) => {
        console.log('err: ', err);
        openNotification({
          title: 'Error',
          message: 'Oops! Something went wrong. Please try again.',
          type: 'error',
        });
      });
  };

  return {
    queryParams,
    productImageData,
    productImageDataIsFetching,
    productImageDataRefetch,
    handlePageChange,
    handleDeleteProductImage,
    mutateDeleteProductImageIsLoading,
    ProductImageDraggerProps,
  };
}
