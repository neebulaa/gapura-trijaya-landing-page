import { debounce } from '@/commons/utils/Debounce';
import { useGetUsers } from '@/services/queries/admin/user.query';
import { QueryParams, sortBy } from '@/types/base';
import { IUser } from '@/types/user';
import { ColumnType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

export default function useUserIndexController() {
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
   * Query: Get User Data
   */
  const {
    data: userData,
    isFetching: userDataIsFetching,
    refetch: userDataRefetch,
  } = useGetUsers(queryParams);

  /**
   * Handle Table Change/Get User Data
   */
  const handleTableChange = (newPagination: any) => {
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
   * Breadcrumb
   */
  const breadcrumbItem = [{ title: 'Home' }, { title: 'User' }];

  /**
   * Effects
   */
  useEffect(() => {
    if (userData && userData.meta.total < (queryParams.page ?? 1) && userData.meta.total !== 0) {
      setQueryParams({
        ...queryParams,
        page: userData.meta.total,
      });
    }
  }, [userData]);

  useEffect(() => {
    setSearchParams(queryParams as URLSearchParamsInit);
  }, [queryParams]);

  /**
   * Table: Table User Data
   */
  const UserTableProps: ColumnType<IUser>[] | any = [
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
      render(_: string, record: IUser) {
        return `${record.firstName} ${record.lastName ?? ''}`;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return {
    breadcrumbItem,
    userData,
    userDataIsFetching,
    userDataRefetch,
    UserTableProps,
    handleTableChange,
    handleSearch,
  };
}
