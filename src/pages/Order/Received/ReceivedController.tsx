import { separator } from '@/commons/utils/Currency/Currency';
import { useGetReceivedOrder } from '@/services/queries/order.query';
import { IOrder, IOrderItem } from '@/types/order';
import { ColumnType } from 'antd/es/table';
import { useParams } from 'react-router-dom';

export default function useReceivedController() {
  const { orderId } = useParams<{ orderId: string }>();

  /** State */

  /**
   * Query the order details
   */
  const {
    data: orderData,
    isPending: orderDataIsFetching,
    refetch: orderDataIsRefetch,
  } = useGetReceivedOrder(orderId!);

  /**
   * Table properties for the received order
   */
  const ReceivedOrderTableProps: ColumnType<IOrderItem>[] = [
    {
      title: '#',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Item',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
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
          ([key, value]) => `<li>${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}</li>`
        );
        return <div dangerouslySetInnerHTML={{ __html: `<ul>${attributeItems.join('')}</ul>` }} />;
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      align: 'center',
    },
    {
      title: 'Unit Cost',
      dataIndex: 'basePrice',
      key: 'basePrice',
      render: (text: string) => `Rp ${separator(text)}`,
    },
    {
      title: 'Total',
      dataIndex: 'subTotal',
      key: 'subTotal',
      render: (text: string) => `Rp ${separator(text)}`,
    },
  ];

  /**
   * Represents the order items extracted from the order data.
   * @type {Array<IOrderItem>}
   */
  const orderItems = (orderData?.data as IOrder)?.orderItems?.map((item: IOrderItem) => ({
    ...item,
    key: item.sku,
    // attributes: JSON.stringify(item.attributes),
  }));

  return {
    orderData,
    orderDataIsFetching,
    orderDataIsRefetch,
    ReceivedOrderTableProps,
    orderItems,
  };
}
