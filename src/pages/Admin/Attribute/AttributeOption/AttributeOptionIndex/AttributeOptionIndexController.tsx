import { debounce } from '@/commons/utils/Debounce';
import { useGetAttributeOptions } from '@/services/queries/admin/attribute.option.query';
import { IAttributeOption } from '@/types/attributeOption';
import { QueryParams, sortBy } from '@/types/base';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { useEffect, useState } from 'react';
import {
  Link,
  URLSearchParamsInit,
  useParams,
  useSearchParams
} from 'react-router-dom';

export default function useAttributeOptionIndexController() {
  // const navigate = useNavigate();

  /**
   * Params
   */
  const { attributeId } = useParams();

  /**
   * State
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState<QueryParams>({
    page: +(searchParams.get('page') ?? 1),
    limit: +(searchParams.get('limit') ?? 10),
    orderBy: 'id',
    sortBy: sortBy.DESC,
    // attributeId: attributeId,
  });

  /**
   * Model
   */
  const {
    data: attributeOptionData,
    isFetching: attributeOptionDataIsFetching,
    refetch: attributeOptionDataRefetch,
  } = useGetAttributeOptions(queryParams, attributeId);

  //   const { mutateAsync: mutateDeleteAttribute, isPending: mutateDeleteAttributeIsLoading } =
  //     useDeleteAttribute();

  /**
   * Effects
   */
  useEffect(() => {
    if (
      attributeOptionData &&
      attributeOptionData.meta.total < (queryParams.page ?? 1) &&
      attributeOptionData.meta.total !== 0
    ) {
      setQueryParams({
        ...queryParams,
        page: attributeOptionData.meta.total,
      });
    }
  }, [attributeOptionData]);

  useEffect(() => {
    setSearchParams(queryParams as URLSearchParamsInit);
  }, [queryParams]);

  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    { title: 'Home' },
    { title: <Link to="/admin/attributes">Attribute</Link> },
    { title: 'Attribute Options' },
  ];

  /**
   * Handle: Table Change/Get Attribute Option Data
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
   * Table: columns
   */
  const AttributeOptionTableProps: ColumnType<IAttributeOption>[] | any = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: '8%',
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
  ];

  return {
    breadcrumbItem,
    AttributeOptionTableProps,
    attributeId,
    attributeOptionData,
    attributeOptionDataIsFetching,
    attributeOptionDataRefetch,
    handleTableChange,
    handleSearch,
  };
}
