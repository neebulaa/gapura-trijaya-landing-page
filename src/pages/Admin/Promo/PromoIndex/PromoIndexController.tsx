import React, { useEffect, useState } from 'react';
import { URLSearchParamsInit, useOutletContext, useSearchParams } from 'react-router-dom';
import { IPromo, PromoQuery, PromoStatusEnum, PromoTypeEnum } from '@/types/promo.ts';
import { useDeletePromo, useGetPromos } from '@/services/queries/admin/promo.query.ts';
import { TablePaginationConfig } from 'antd/es/table';
import { debounce } from '@/commons/utils/Debounce.ts';
import { OutletContextInterface } from '@/types/global/outletContext.ts';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { Popconfirm, Space, Tag, Tooltip } from 'antd';
import {
  BarcodeOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  FileOutlined,
  RedoOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import ToggleableLink from '@/commons/utils/ToggleableLink.tsx';
import ActionButton from '@/commons/components/Button/ActionButton.tsx';

const usePromoIndexController = () => {
  const { openNotification } = useOutletContext<OutletContextInterface>();

  /**
   * State
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const [promoQuery, setPromoQuery] = useState<PromoQuery>({
    page: +(searchParams.get('page') ?? 1),
    limit: +(searchParams.get('limit') ?? 10),
    // orderBy: 'created_at',
    // sortBy: sortBy.DESC,
  });

  /**
   * Get Promo Data
   */
  const {
    data: promoData,
    isFetching: promoDataIsFetching,
    refetch: promoDataRefetch,
  } = useGetPromos(promoQuery);

  /**
   * Delete Mutation
   */
  const { mutateAsync: mutateDeletePromo, isPending: mutateDeletePromoIsLoading } =
    useDeletePromo();

  /**
   * Handle Table Changes
   */
  const handleTableChange = (newPagination: TablePaginationConfig) => {
    setPromoQuery({
      ...promoQuery,
      page: newPagination.current,
      limit: newPagination.pageSize,
    });
  };

  /**
   * Handle Search
   */
  const handleSearch = debounce((value: string) => {
    setPromoQuery({ ...promoQuery, page: 1, search: value });
  }, 500);

  /**
   * Handle Delete
   */
  const handleDelete = async (id: string) => {
    mutateDeletePromo({
      id: id,
    })
      .then((res) => {
        openNotification({
          type: 'success',
          title: 'Success',
          message: res.message as string,
        });
      })
      .catch((err) => {
        openNotification({
          type: 'error',
          title: 'Error',
          message: err.message as string,
        });
      });
  };

  /**
   * Table Columns
   */
  const PromoTableProps: ColumnsType<IPromo> = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: '4%',
      align: 'center',
      fixed: 'left',
      render: (_text: any, _record: any, index: number) => {
        const page = promoQuery?.page ?? 1;
        const limit = promoQuery?.limit ?? 10;
        return (page - 1) * limit + index + 1;
      },
    },
    {
      title: 'Nama Promo',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Tanggal Mulai',
      key: 'startDate',
      render: (_, record) => <>{dayjs(record.startDate).format('DD-MM-YYYY HH:mm:ss')}</>,
    },
    {
      title: 'Tanggal Selesai',
      key: 'endDate',
      render: (_, record) => <>{dayjs(record.endDate).format('DD-MM-YYYY HH:mm:ss')}</>,
    },
    {
      title: 'Tipe Promo',
      key: 'type',
      width: '10%',
      align: 'center',
      render: (_, record) => {
        switch (record.promoType) {
          case PromoTypeEnum.CODE:
            return (
              <Tooltip title={'Copy Code'}>
                <Tag
                  className={'cursor-pointer'}
                  color="cyan"
                  icon={<BarcodeOutlined />}
                  onClick={() => {
                    navigator.clipboard.writeText(record.code).then(() => {
                      openNotification({
                        type: 'success',
                        title: 'Copied',
                        message: 'Kode Kupon Berhasi di-copy!',
                      });
                    });
                  }}
                >
                  Coupon Code
                </Tag>
              </Tooltip>
            );
          case PromoTypeEnum.QTY:
            return (
              <Tag color="geekblue" icon={<ShoppingOutlined />}>
                Qty
              </Tag>
            );
          default:
            return <Tag color="default">???</Tag>;
        }
      },
    },
    {
      title: 'Status',
      key: 'status',
      width: '10%',
      align: 'center',
      render: (_, record) => {
        switch (record.status) {
          case PromoStatusEnum.DRAFT:
            return (
              <Tag color="blue" icon={<FileOutlined />}>
                Draft
              </Tag>
            );
          case PromoStatusEnum.ACTIVE:
            return (
              <Tag color="green" icon={<RedoOutlined spin />}>
                Active
              </Tag>
            );
          case PromoStatusEnum.INACTIVE:
            return (
              <Tag color="red" icon={<ExclamationCircleOutlined />}>
                Inactive
              </Tag>
            );
          default:
            return <Tag color="default">???</Tag>;
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'key',
      width: '15%',
      align: 'center',
      fixed: 'right',
      render: (_text: string, record: IPromo) => (
        <>
          <Space direction={'horizontal'} size={1}>
            <ToggleableLink to={`/admin/promos/${record.id!}/edit`}>
              <ActionButton
                icon={<EditOutlined />}
                hoverMessage="Edit"
                status="warning"
                type="default"
              />
            </ToggleableLink>

            <Popconfirm
              title="Yakin Untuk Menghapus?"
              onConfirm={() => handleDelete(record.id)}
              placement="left"
            >
              <ActionButton
                icon={<DeleteOutlined />}
                hoverMessage="Delete"
                status="danger"
                type="default"
                danger={true}
                loading={mutateDeletePromoIsLoading}
              />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  /**
   * Effects
   */
  useEffect(() => {
    if (promoData && promoData.meta.total < (promoQuery.page ?? 1) && promoData.meta.total !== 0) {
      setPromoQuery({
        ...promoQuery,
        page: promoData.meta.total,
      });
    }
  }, [promoData]);

  useEffect(() => {
    setSearchParams(promoQuery as URLSearchParamsInit);
  }, [promoQuery]);

  return {
    handleSearch,
    promoData,
    promoDataIsFetching,
    promoDataRefetch,
    PromoTableProps,
    handleTableChange,
  };
};

export default usePromoIndexController;
