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
      id: '1',
      userId: null,
      code: 'ORD001',
      status: 'Pending',
      orderDate: '2024-06-01 12:00:00',
      paymentDue: '2024-06-05',
      paymentStatus: 'Unpaid',
      paymentToken: null,
      paymentUrl: null,
      baseTotalPrice: '400000',
      taxAmount: '50000',
      taxPercent: '10',
      discountAmount: '0',
      discountPercent: '0',
      shippingCost: '50000',
      grandTotal: '500000',
      note: '',
      customerFirstName: 'John',
      customerLastName: 'Doe',
      customerAddress1: '123 Main St',
      customerAddress2: '',
      customerPhone: '08123456789',
      customerEmail: 'john.doe@example.com',
      customerCityId: '1',
      customerProvinceId: '1',
      customerPostcode: 12345,
      shippingCourier: null,
      shippingServiceName: null,
      approvedBy: null,
      approvedAt: null,
      cancelledBy: null,
      cancelledAt: null,
      cancellationNote: null,
      deletedAt: null,
      customerFullName: 'John Doe',
      orderItems: [],
    },
    {
      id: '2',
      userId: null,
      code: 'ORD002',
      status: 'Completed',
      orderDate: '2024-06-02 14:30:00',
      paymentDue: '2024-06-06',
      paymentStatus: 'Paid',
      paymentToken: null,
      paymentUrl: null,
      baseTotalPrice: '650000',
      taxAmount: '100000',
      taxPercent: '15',
      discountAmount: '0',
      discountPercent: '0',
      shippingCost: '0',
      grandTotal: '750000',
      note: '',
      customerFirstName: 'Jane',
      customerLastName: 'Smith',
      customerAddress1: '456 Market St',
      customerAddress2: '',
      customerPhone: '08234567890',
      customerEmail: 'jane.smith@example.com',
      customerCityId: '2',
      customerProvinceId: '2',
      customerPostcode: 54321,
      shippingCourier: null,
      shippingServiceName: null,
      approvedBy: null,
      approvedAt: null,
      cancelledBy: null,
      cancelledAt: null,
      cancellationNote: null,
      deletedAt: null,
      customerFullName: 'Jane Smith',
      orderItems: [],
    },
    // Tambahkan lebih banyak data sesuai kebutuhan
  ];

  /** Table: Order Table Props */
  const OrderTableProps: ColumnType<IOrder>[] | any = [
    {
      title: 'Order ID',
      dataIndex: 'code',
      key: 'code',
      render: (text: string, record: IOrder) => (
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
      render: (text: number) => `Rp ${text.toLocaleString()}`,
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
      render: (text: string, record: IOrder) => (
        <Tag color={record.status === 'Pending' ? 'warning' : 'success'}>{text}</Tag>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (text: string, record: IOrder) => (
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
