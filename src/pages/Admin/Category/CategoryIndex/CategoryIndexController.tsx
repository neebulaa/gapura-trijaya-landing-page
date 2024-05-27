import ActionButton from '@/commons/components/Button/ActionButton';
import { debounce } from '@/commons/utils/Debounce';
import ToggleableLink from '@/commons/utils/ToggleableLink';
import {
  useDeleteCategory,
  useGetCategories,
} from '@/services/queries/admin/category.query.ts';
import { QueryParams, sortBy } from '@/types/base';
import { ICategory } from '@/types/category';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

export default function useCategoryIndexController() {
  /**
   * State
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: +(searchParams.get('page') ?? 1),
    limit: +(searchParams.get('limit') ?? 10),
    orderBy: 'id',
    sortBy: sortBy.DESC,
  });

  /**
   * Model
   */
  const {
    data: categoryData,
    isFetching: categoryDataIsFetching,
    refetch: categoryDataRefetch,
  } = useGetCategories(queryParams);

  const {
    mutateAsync: mutateDeleteCategory,
    isPending: mutateDeleteCategoryIsLoading,
  } = useDeleteCategory();

  /**
   * Effects
   */
  useEffect(() => {
    if (
      categoryData &&
      categoryData.meta.total < (queryParams.page ?? 1) &&
      categoryData.meta.total !== 0
    ) {
      setQueryParams({
        ...queryParams,
        page: categoryData.meta.total,
      });
    }
  }, [categoryData]);

  useEffect(() => {
    setSearchParams(queryParams as URLSearchParamsInit);
  }, [queryParams]);

  /**
   * Breadcrumb
   */
  const breadcrumbItem = [{ title: 'Home' }, { title: 'Category' }];

  /**
   * Handle: Table Change/Get Category Data
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
  const deleteCategory = async (id: string) => {
    await mutateDeleteCategory(id);
  };

  /**
   * Table: columns
   */
  const CategoryTableProps: ColumnType<ICategory>[] = [
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'key',
      width: '15%',
      align: 'center',
      fixed: 'right',
      render: (_, record: any) => (
        <>
          <ToggleableLink to={`/admin/categories/${record.id!}/edit`}>
            <ActionButton
              icon={<EditOutlined />}
              hoverMessage="Edit"
              status="warning"
              type="default"
            />
          </ToggleableLink>

          <Popconfirm
            title="Yakin Untuk Menghapus?"
            onConfirm={() => deleteCategory(record.id!)}
            placement="left"
          >
            <ActionButton
              icon={<DeleteOutlined />}
              hoverMessage="Delete"
              status="danger"
              type="default"
              danger={true}
              loading={mutateDeleteCategoryIsLoading}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  return {
    breadcrumbItem,
    handleSearch,
    CategoryTableProps,
    categoryData,
    categoryDataIsFetching,
    categoryDataRefetch,
    handleTableChange,
  };
}
