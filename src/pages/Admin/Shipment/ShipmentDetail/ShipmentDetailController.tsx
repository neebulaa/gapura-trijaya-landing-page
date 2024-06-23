import { separator } from '@/commons/utils/Currency/Currency';
import { useGetShipment } from '@/services/queries/admin/shipment.query';
import { IOrderItem } from '@/types/order';
import { ColumnType } from 'antd/es/table';
import { Link, useParams } from 'react-router-dom';

export default function useShipmentDetailController() {
  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    { title: 'Home' },
    { title: <Link to="/admin/shipments">Shipment</Link> },
    { title: `Detail` },
  ];

  const { id } = useParams();

  /**
   * Query Model Get One Order
   */
  const {
    data: shipmentData,
    isPending: shipmentDataIsFetching,
    refetch: shipmentDataIsRefetch,
  } = useGetShipment(id!, { enabled: true });

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
    shipmentData,
    shipmentDataIsFetching,
    shipmentDataIsRefetch,
    OrderItemsTableProps,
  };
}
