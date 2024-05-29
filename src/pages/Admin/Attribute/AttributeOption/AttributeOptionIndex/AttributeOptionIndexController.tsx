import ActionButton from '@/commons/components/Button/ActionButton';
import { renderIndexColumn } from '@/commons/lib/helper';
import { debounce } from '@/commons/utils/Debounce';
import {
  useCreateAttributeOption,
  useDeleteAttributeOption,
  useGetAttributeOptions,
} from '@/services/queries/admin/attribute.option.query';
import {
  CreateAttributeOptionDto,
  IAttributeOption,
  UpdateAttributeOptionDto,
} from '@/types/attributeOption';
import { QueryParams, sortBy } from '@/types/base';
import { OutletContextInterface } from '@/types/global/outletContext';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import { useEffect, useState } from 'react';
import {
  Link,
  URLSearchParamsInit,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { IAttributeOptionModalState } from '../interface/attributeOptionModal.interface';

export default function useAttributeOptionIndexController() {
  // const navigate = useNavigate();
  const { openNotification } = useOutletContext<OutletContextInterface>();

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
  });
  const [modalState, setModalState] = useState<IAttributeOptionModalState>({
    isOpen: false,
    formMode: 'Create',
  });

  /**
   * Query Model: Get Attribute Option Data
   */
  const {
    data: attributeOptionData,
    isFetching: attributeOptionDataIsFetching,
    refetch: attributeOptionDataRefetch,
  } = useGetAttributeOptions(queryParams, attributeId);

  /**
   * Query Model: Delete Attribute Option
   */
  const {
    mutateAsync: mutateDeleteAttributeOption,
    isPending: mutateDeleteAttributeOptionIsLoading,
  } = useDeleteAttributeOption();

  /**
   * Query Model: Create Attribute Option
   */
  const {
    mutateAsync: mutateCreateAttributeOption,
    isPending: mutateCreateAttributeOptionIsLoading,
  } = useCreateAttributeOption(attributeId!);

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
   * Handle Delete: Attribute Option
   */
  const handleDelete = (id: string) => {
    mutateDeleteAttributeOption(id).then((res) => {
      openNotification({
        type: 'success',
        title: 'Success',
        message: res?.message as string,
      });
    });
  };

  /**
   * Handle Modal: Open
   */
  const handleModalOpen = (type: 'Create' | 'Edit' = 'Create', id?: number) => {
    console.log('id: ', id);

    // setIsModalOpen(true);
    setModalState({
      isOpen: true,
      formMode: type,
    });
  };

  /**
   * Handle Modal: Close
   */
  const handleModalClose = () => {
    // setIsModalOpen(false);
    setModalState({
      isOpen: false,
      formMode: 'Create',
    });
  };

  /**
   * Handle Modal: Ok
   */
  const handleModalOk = (data: CreateAttributeOptionDto | UpdateAttributeOptionDto) => {
    mutateCreateAttributeOption(data)
      .then((res) => {
        console.log('res: ', res);
        openNotification({
          type: 'success',
          title: 'Success',
          message: res?.message as string,
        });
      })
      .then(() => {
        handleModalClose();
      });
  };

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
      render: renderIndexColumn(queryParams),
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
      width: '20%',
      align: 'center',
      fixed: 'right',
      render: (_: any, record: any) => (
        <>
          <ActionButton
            icon={<EditOutlined />}
            hoverMessage="Edit"
            status="warning"
            type="default"
            onClick={() => handleModalOpen('Edit', record.id)}
          />

          <Popconfirm
            title="Yakin Untuk Menghapus?"
            onConfirm={() => handleDelete(record.id!)}
            placement="left"
          >
            <ActionButton
              icon={<DeleteOutlined />}
              hoverMessage="Delete"
              status="danger"
              type="default"
              danger={true}
              loading={mutateDeleteAttributeOptionIsLoading}
            />
          </Popconfirm>
        </>
      ),
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
    modalState,
    handleModalOpen,
    handleModalClose,
    handleModalOk,
    mutateCreateAttributeOptionIsLoading,
    mutateDeleteAttributeOptionIsLoading,
  };
}
