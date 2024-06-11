import ActionButton from '@/commons/components/Button/ActionButton';
import { debounce } from '@/commons/utils/Debounce';
import ToggleableLink from '@/commons/utils/ToggleableLink';
import { QueryParams, sortBy } from '@/types/base';
import { OutletContextInterface } from '@/types/global/outletContext';
import { IOrder } from '@/types/order';
import { EyeOutlined } from '@ant-design/icons';
import { Form, Tag } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useState } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';

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
    const status = filterForm.getFieldValue('status');

    setQueryParams((prevState) => ({
      ...prevState,
      // ...(status
      //   ? {
      //     status: status,
      //   }
      //   : {}),
    }));
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

  /** Dummy data of OrderData */
  const orderData: IOrder[] = [
    {
      key: '1',
      orderId: 'ORD001',
      orderDate: '2024-06-01 12:00:00',
      grandTotal: 500000,
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      status: 'Pending',
      paymentStatus: 'Unpaid',
    },
    {
      key: '2',
      orderId: 'ORD002',
      orderDate: '2024-06-02 14:30:00',
      grandTotal: 750000,
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      status: 'Completed',
      paymentStatus: 'Paid',
    },
    // Tambahkan lebih banyak data sesuai kebutuhan
  ];

  /** Table: Order Table Props */
  const OrderTableProps: ColumnType<IOrder>[] | any = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      render: (text, record) => (
        <>
          {text}
          <br />
          <span style={{ fontSize: 12, fontWeight: 'normal' }}>{record.orderDate}</span>
        </>
      ),
    },
    {
      title: 'Grand Total',
      dataIndex: 'grandTotal',
      key: 'grandTotal',
      render: (text) => `Rp ${text.toLocaleString()}`,
    },
    {
      title: 'Name',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text, record) => (
        <>
          {text}
          <br />
          <span style={{ fontSize: 12, fontWeight: 'normal' }}>{record.customerEmail}</span>
        </>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <Tag color={record.status === 'Pending' ? 'warning' : 'success'}>{text}</Tag>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (text, record) => (
        <Tag color={record.paymentStatus === 'Unpaid' ? 'default' : 'success'}>{text}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'key',
      width: '15%',
      align: 'center',
      fixed: 'right',
      render: (text, record) => (
        <ToggleableLink to={`/admin/orders/${record.key!}/show`}>
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
