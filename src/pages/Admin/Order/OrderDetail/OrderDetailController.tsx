import { api } from '@/commons/lib/api';
import { separator } from '@/commons/utils/Currency/Currency.ts';
import { useGetOrder } from '@/services/queries/admin/order.query.ts';
import { IOrderItem } from '@/types/order.ts';
import { ColumnType } from 'antd/es/table';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function useOrderDetailController() {
  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    { title: 'Home' },
    { title: <Link to="/admin/orders">Order</Link> },
    { title: `Detail` },
  ];

  const { id } = useParams();
  const navigate = useNavigate();

  /**
   * Query Model Get One Order
   */
  const {
    data: orderData,
    isPending: orderDataIsFetching,
    refetch: orderDataIsRefetch,
  } = useGetOrder(id!, { enabled: true });

  /**
   * Handle Cancel Order
   */
  const handleOrderCancel = () => {
    console.log('Cancel Order');
  };

  /**
   * Handle Remove Order
   */
  const handleOrderRemove = () => {
    console.log('Remove Order');
  };

  /**
   * Handle Bypass payment
   */
  const handleBypassPayment = () => {
    api.get(`/v1/admin/orders/${id}/bypass-payment`).then((res) => {
      console.log(res);
      orderDataIsRefetch();
    });
  };

  /**
   * Order Items Table Columns Props
   */
  const OrderItemsTableProps: ColumnType<IOrderItem>[] = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Attributes',
      dataIndex: 'attributes',
      key: 'attributes',
      render: (text: string) => {
        if (!text) return 'No description available';
        let attributes;
        try {
          attributes = JSON.parse(text);
        } catch (error) {
          return 'Invalid description format';
        }
        if (!attributes || typeof attributes !== 'object') return 'No description available';
        const attributeItems = Object.entries(attributes).map(
          ([key, value]) => `<li>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</li>`,
        );
        return <div dangerouslySetInnerHTML={{ __html: `<ul>${attributeItems.join('')}</ul>` }} />;
      },
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
    },
    {
      title: 'Base Price',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (text) => `Rp ${separator(text)}`,
    },
    {
      title: 'Sub Total',
      dataIndex: 'subTotal',
      key: 'subTotal',
      render: (text) => `Rp ${separator(text)}`,
    },
  ];

  return {
    breadcrumbItem,
    orderData,
    orderDataIsFetching,
    orderDataIsRefetch,
    OrderItemsTableProps,
    handleOrderCancel,
    handleOrderRemove,
    handleBypassPayment,
  };
}
