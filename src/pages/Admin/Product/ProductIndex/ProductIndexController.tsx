import ActionButton from '@/commons/components/Button/ActionButton';
import { separator } from '@/commons/utils/Currency/Currency';
import { debounce } from '@/commons/utils/Debounce';
import ToggleableLink from '@/commons/utils/ToggleableLink';
import { useDeleteProduct, useGetProducts } from '@/services/queries/admin/product.query.ts';
import { QueryParams, sortBy } from '@/types/base';
import { IProduct } from '@/types/product';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import ProductStatusNode from '../components/reusable/ProductStatusNode';

export default function useProductIndexController() {
  /**
   * State
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: +(searchParams.get('page') ?? 1),
    limit: +(searchParams.get('limit') ?? 10),
    orderBy: 'name',
    sortBy: sortBy.ASC,
  });

  /**
   * Model
   */
  const {
    data: productData,
    isFetching: productDataIsFetching,
    refetch: productDataRefetch,
  } = useGetProducts(queryParams);

  const { mutateAsync: mutateDeleteProduct, isPending: mutateDeleteProductIsLoading } =
    useDeleteProduct();

  /**
   * Effects
   */
  useEffect(() => {
    if (
      productData &&
      productData.meta.total < (queryParams.page ?? 1) &&
      productData.meta.total !== 0
    ) {
      setQueryParams({
        ...queryParams,
        page: productData.meta.total,
      });
    }
  }, [productData]);

  useEffect(() => {
    setSearchParams(queryParams as URLSearchParamsInit);
  }, [queryParams]);

  /**
   * Breadcrumb
   */
  const breadcrumbItem = [{ title: 'Home' }, { title: 'Product' }];

  /**
   * Handle: Table Change/Get Product Data
   */
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setQueryParams({
      ...queryParams,
      page: newPagination.current,
      limit: newPagination.pageSize,
    });
  };

  /**
   * Handle Search
   */
  const handleSearch = debounce((value: string) => {
    setQueryParams({ ...queryParams, page: 1, search: value });
  }, 500);

  /**
   * Handle Delete
   */
  const deleteProduct = async (id: string) => {
    await mutateDeleteProduct(id);
  };

  /**
   * Table: columns
   */
  const ProductTableProps: ColumnType<IProduct>[] | any = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      align: 'center',
      fixed: 'left',
      render: (_text: any, _record: any, index: number) => {
        const page = queryParams?.page ?? 1;
        const limit = queryParams?.limit ?? 10;
        return (page - 1) * limit + index + 1;
      },
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: '10%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      render: (_: any, record: IProduct) => {
        if (record.parentId === null) {
          return <span className="font-bold">{record.name}</span>;
        } else {
          return <span>{record.name}</span>;
        }
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '10%',
      render: (_: any, record: any) => (
        <span>{record.price ? `Rp. ${separator(record.price)}` : '-'}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      align: 'center',
      render: (_: any, record: any) => <ProductStatusNode status={record.status} />,
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'key',
      width: '10%',
      align: 'center',
      fixed: 'right',
      render: (_: any, record: any) => (
        <>
          <ToggleableLink to={`/admin/products/${record.id!}/edit`}>
            <ActionButton
              icon={<EditOutlined />}
              hoverMessage="Edit"
              status="warning"
              type="default"
            />
          </ToggleableLink>

          <Popconfirm
            title="Yakin Untuk Menghapus?"
            onConfirm={() => deleteProduct(record.id!)}
            placement="left"
          >
            <ActionButton
              icon={<DeleteOutlined />}
              hoverMessage="Delete"
              status="danger"
              type="default"
              danger={true}
              loading={mutateDeleteProductIsLoading}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  return {
    breadcrumbItem,
    handleSearch,
    ProductTableProps,
    productData,
    productDataIsFetching,
    productDataRefetch,
    handleTableChange,
  };
}
