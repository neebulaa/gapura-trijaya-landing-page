import ActionButton from '@/commons/components/Button/ActionButton';
import { renderIndexColumn } from '@/commons/lib/helper';
import { debounce } from '@/commons/utils/Debounce';
import ToggleableLink from '@/commons/utils/ToggleableLink';
import { useDeleteAttribute, useGetAttributes } from '@/services/queries/admin/attribute.query';
import { IAttribute } from '@/types/attribute';
import { QueryParams, sortBy } from '@/types/base';
import { DeleteOutlined, EditOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

export default function useAttributeIndexController() {
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
    data: attributeData,
    isFetching: attributeDataIsFetching,
    refetch: attributeDataRefetch,
  } = useGetAttributes(queryParams);

  const { mutateAsync: mutateDeleteAttribute, isPending: mutateDeleteAttributeIsLoading } =
    useDeleteAttribute();

  /**
   * Effects
   */
  useEffect(() => {
    if (
      attributeData &&
      attributeData.meta.total < (queryParams.page ?? 1) &&
      attributeData.meta.total !== 0
    ) {
      setQueryParams({
        ...queryParams,
        page: attributeData.meta.total,
      });
    }
  }, [attributeData]);

  useEffect(() => {
    setSearchParams(queryParams as URLSearchParamsInit);
  }, [queryParams]);

  /**
   * Breadcrumb
   */
  const breadcrumbItem = [{ title: 'Home' }, { title: 'Attribute' }];

  /**
   * Handle: Table Change/Get Attribute Data
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
  const deleteAttribute = async (id: string) => {
    await mutateDeleteAttribute(id);
  };

  /**
   * Table: columns
   */
  const AttributeTableProps: ColumnType<IAttribute>[] | any = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: '8%',
      align: 'center',
      fixed: 'left',
      render: renderIndexColumn(queryParams),
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'key',
      width: '20%',
      align: 'center',
      fixed: 'right',
      render: (_: any, record: any) => (
        <>
          <ToggleableLink to={`/admin/attributes/${record.id!}/edit`}>
            <ActionButton
              icon={<EditOutlined />}
              hoverMessage="Edit"
              status="warning"
              type="default"
            />
          </ToggleableLink>

          <ToggleableLink to={`/admin/attributes/${record.id!}/options`}>
            <ActionButton
              icon={<UnorderedListOutlined />}
              hoverMessage="Options"
              status="success"
              type="default"
            />
          </ToggleableLink>

          <Popconfirm
            title="Yakin Untuk Menghapus?"
            onConfirm={() => deleteAttribute(record.id!)}
            placement="left"
          >
            <ActionButton
              icon={<DeleteOutlined />}
              hoverMessage="Delete"
              status="danger"
              type="default"
              danger={true}
              loading={mutateDeleteAttributeIsLoading}
            />
          </Popconfirm>
        </>
      ),
    },
  ];

  return {
    breadcrumbItem,
    handleSearch,
    AttributeTableProps,
    attributeData,
    attributeDataIsFetching,
    attributeDataRefetch,
    handleTableChange,
  };
}
