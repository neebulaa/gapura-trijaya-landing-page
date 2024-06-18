import ActionButton from '@/commons/components/Button/ActionButton';
import { debounce } from '@/commons/utils/Debounce';
import ToggleableLink from '@/commons/utils/ToggleableLink';
import ShipmentStatusNode from '@/pages/Admin/Shipment/components/reusable/ShipmentStatusNode';
import { useGetShipments } from '@/services/queries/admin/shipment.query';
import { QueryParams, sortBy } from '@/types/base';
import { ShipmentStatus } from '@/types/enum/shipment-status.enum';
import { IShipment } from '@/types/shipment';
import { EyeOutlined } from '@ant-design/icons';
import { ColumnType, TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

export default function useShipmentIndexController() {
  /**
   * Breadcrumb
   */
  const breadcrumbItem = [{ title: 'Home' }, { title: `Shipments` }];

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
   * Query Model: Get shipments
   */
  const {
    data: shipmentData,
    isFetching: shipmentDataIsFetching,
    refetch: shipmentDataIsRefetch,
  } = useGetShipments(queryParams);

  /**
   * Effects
   */
  useEffect(() => {
    if (
      shipmentData &&
      shipmentData.meta.total < (queryParams.page ?? 1) &&
      shipmentData.meta.total !== 0
    ) {
      setQueryParams({
        ...queryParams,
        page: shipmentData.meta.total,
      });
    }
  }, [shipmentData]);

  useEffect(() => {
    setSearchParams(queryParams as URLSearchParamsInit);
  }, [queryParams]);

  /**
   * Handle Search
   */
  const handleSearch = debounce((value: string) => {
    setQueryParams({ ...queryParams, page: 1, search: value });
  }, 500);

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
   * Table Shipment Props
   */
  const TableShipmentProps: ColumnType<IShipment>[] = [
    {
      title: 'Order ID',
      dataIndex: 'order',
      key: 'order',
      width: '25%',
      render: (_text: string, record: IShipment) => (
        <>
          <div>{record?.order?.code}</div>
          <div style={{ fontSize: '12px', fontWeight: 'normal' }}>{record?.order?.orderDate}</div>
        </>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'order',
      key: 'name',
      render: (_text: string, record: IShipment) => record?.order?.customerFullName,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: ShipmentStatus, record: IShipment) => (
        <>
          <ShipmentStatusNode status={status} />
          <div style={{ fontSize: '12px', fontWeight: 'normal' }}>
            <>
              {record.shippedAt
                ? dayjs(record.shippedAt).format('HH:mm:ss DD/MM/YYYY')
                : 'Not Shipped'}
            </>
          </div>
        </>
      ),
    },
    {
      title: 'Total Qty',
      dataIndex: 'totalQty',
      key: 'totalQty',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Total Weight (gram)',
      dataIndex: 'totalWeight',
      key: 'totalWeight',
      align: 'center',
      render: (totalWeight: number) => {
        const weightInKg = totalWeight / 1000;
        return (
          <>
            {totalWeight} gram {`(${weightInKg} KG)`}
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'key',
      width: '10%',
      align: 'center',
      fixed: 'right',
      render: (_text: string, record: IShipment) => (
        <ToggleableLink to={`/admin/shipments/${record.id!}/show`}>
          <ActionButton
            icon={<EyeOutlined />}
            hoverMessage="Show"
            status="success"
            type="default"
          />
        </ToggleableLink>
      ),
    },
  ];

  return {
    breadcrumbItem,
    TableShipmentProps,
    shipmentData,
    shipmentDataIsFetching,
    shipmentDataIsRefetch,
    handleTableChange,
    handleSearch,
  };
}
