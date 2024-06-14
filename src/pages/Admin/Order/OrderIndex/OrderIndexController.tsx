import ActionButton from '@/commons/components/Button/ActionButton';
import { separator } from '@/commons/utils/Currency/Currency';
import { debounce } from '@/commons/utils/Debounce';
import ToggleableLink from '@/commons/utils/ToggleableLink';
import { useGetOrders } from '@/services/queries/admin/order.query';
import { QueryParams, sortBy } from '@/types/base';
import { OutletContextInterface } from '@/types/global/outletContext';
import { IOrder } from '@/types/order';
import { EyeOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { ColumnType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import OrderStatusNode from '@/pages/Admin/Order/components/reusable/OrderStatusNode';
import OrderPaymentStatusNode from '@/pages/Admin/Order/components/reusable/OrderPaymentStatusNode';

export default function useOrderIndexController() {
  const { openNotification } = useOutletContext<OutletContextInterface>();

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
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filterForm] = Form.useForm();

  /**
   * Query Model: Get Orders
   */
  const {
    data: orderData,
    isPending: orderDataIsFetching,
    refetch: orderDataIsRefetch,
  } = useGetOrders(queryParams);

  /**
   * Handle Search
   */
  const handleSearch = debounce((value: string) => {
    setQueryParams({ ...queryParams, page: 1, search: value });
  }, 500);

  /** Handle Toggle Filter */
  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  /**
   * Add Filter
   */
  const handleFilter = () => {
    const params = {
      q: filterForm.getFieldValue('q'),
      status: filterForm.getFieldValue('status'),
      dateRange: filterForm.getFieldValue('dateRange'),
    };

    setQueryParams((prevState) => ({
      ...prevState,
      // ...(status
      //   ? {
      //     status: status,
      //   }
      //   : {}),
    }));

    console.log('handle filter: ', params);
  };

  /**
   * Reset All Filter
   */
  const resetFilter = () => {
    filterForm.resetFields();

    setQueryParams({
      page: +(searchParams.get('page') ?? 1),
      limit: +(searchParams.get('limit') ?? 10),
      orderBy: 'createdAt',
      sortBy: sortBy.DESC,
    });
  };

  /** Breadcrumb item */
  const breadcrumbItem = [{ title: 'Home' }, { title: 'Order' }];

  /** Table: Order Table Props */
  const OrderTableProps: ColumnType<IOrder>[] | any = [
    {
      title: 'Order ID',
      dataIndex: 'code',
      key: 'code',
      width: '25%',
      render: (text: string, record: IOrder) => (
        <>
          <span className="font-medium"> {text}</span>
          <br />
          <span style={{ fontSize: 12, fontWeight: 'normal' }}>
            {dayjs(record.orderDate).format('HH:mm:ss DD/MM/YYYY')}
          </span>
        </>
      ),
    },
    {
      title: 'Grand Total',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
      render: (text: number) => `Rp ${separator(text)}`,
    },
    {
      title: 'Name',
      dataIndex: 'customerFirstName',
      key: 'customerFirstName',
      render: (text: string, record: IOrder) => (
        <>
          {text} {record.customerLastName}
          <br />
          <span style={{ fontSize: 12, fontWeight: 'normal' }}>{record.customerEmail}</span>
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '10%',
      align: 'center',
      render: (_text: string, record: IOrder) => <OrderStatusNode status={record.status} />,
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      width: '10%',
      align: 'center',
      render: (_text: string, record: IOrder) => (
        <OrderPaymentStatusNode status={record.paymentStatus} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'key',
      width: '15%',
      align: 'center',
      fixed: 'right',
      render: (_text: string, record: IOrder) => (
        <ToggleableLink to={`/admin/orders/${record.id!}/show`}>
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
    filterForm,
    handleSearch,
    orderData,
    OrderTableProps,
    isFilterVisible,
    setIsFilterVisible,
    handleToggleFilter,
    handleFilter,
    resetFilter,
  };
}
