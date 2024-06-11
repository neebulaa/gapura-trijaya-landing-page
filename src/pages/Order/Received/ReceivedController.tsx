import { separator } from '@/commons/utils/Currency/Currency';
import { useGetReceivedOrder } from '@/services/queries/order.query';
import { useParams } from 'react-router-dom';

export default function useReceivedController() {
  const { orderId } = useParams<{ orderId: string }>();

  /** State */

  const order = {
    customerFirstName: 'John',
    customerLastName: 'Doe',
    customerAddress1: '123 Main Street',
    customerAddress2: 'Apartment 4B',
    customerEmail: 'johndoe@mail.test',
    customerPhone: '123-456-7890',
    customerPostcode: '12345',
    shipment: {
      firstName: 'Jane',
      lastName: 'Doe',
      address1: '456 Another Street',
      address2: 'Suite 1A',
      email: 'janedoe@mail.test',
      phone: '098-765-4321',
      postcode: '67890',
    },
    code: 'INV-123456',
    orderDate: '2024-06-07',
    status: 'Processing',
    paymentStatus: 'Pending',
    shippingServiceName: 'DHL Express',
    orderItems: [
      {
        sku: 'ITEM-001',
        name: 'Product 1',
        attributes: '<ul><li>Color: Red</li><li>Size: M</li></ul>',
        qty: 2,
        basePrice: '750,000.00',
        subTotal: '1,500,000.00',
      },
      {
        sku: 'ITEM-002',
        name: 'Product 2',
        attributes: '<ul><li>Color: Blue</li><li>Size: L</li></ul>',
        qty: 1,
        basePrice: '1,125,000.00',
        subTotal: '1,125,000.00',
      },
    ],
    baseTotalPrice: '2,625,000.00',
    taxAmount: '262,500.00',
    shippingCost: '150,000.00',
    grandTotal: '3,037,500.00',
    isPaid: false,
    paymentUrl: 'https://payment.example.com/inv-123456',
  };

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
  const ReceivedOrderTableProps = [
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

        const attributes = JSON.parse(text);
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

  const orderItems = orderData?.data.orderItems.map((item: any) => ({
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
