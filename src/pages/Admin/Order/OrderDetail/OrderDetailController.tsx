import { Link, useParams } from 'react-router-dom';

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

  /**
   * Dummy Order Detail
   */
  const orderDetail = {
    orderId: '123',
    customerFirstName: 'John',
    customerLastName: 'Doe',
    customerAddress1: '123 Main St',
    customerAddress2: 'Apt 101',
    customerEmail: 'john@example.com',
    customerPhone: '123-456-7890',
    customerPostcode: '12345',
    shipment: {
      id: '456',
      firstName: 'Jane',
      lastName: 'Doe',
      address1: '456 Oak St',
      address2: 'Suite 202',
      email: 'jane@example.com',
      phone: '987-654-3210',
      postcode: '54321',
    },
    code: 'ORD-123456',
    orderDate: '2024-06-11',
    status: 'Completed',
    isCancelled: false,
    isPaid: false,
    cancellationNote: '',
    paymentStatus: 'Paid',
    shippingServiceName: 'Express Shipping',
    baseTotalPrice: '$100.00',
    taxAmount: '$10.00',
    shippingCost: '$15.00',
    grandTotal: '$125.00',
    orderItems: [
      {
        sku: 'SKU-001',
        name: 'Product 1',
        attributes: 'Size: Large, Color: Blue',
        qty: 2,
        basePrice: '$50.00',
        subTotal: '$100.00',
      },
      {
        sku: 'SKU-002',
        name: 'Product 2',
        attributes: 'Size: Medium, Color: Red',
        qty: 1,
        basePrice: '$50.00',
        subTotal: '$50.00',
      },
    ],
    trashed: false,
    paymentUrl: 'https://payment.example.com/inv-123456',
  };

  /**
   * Order Items Table Columns Props
   */
  const OrderItemsTableProps = [
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
    },
    {
      title: 'Sub Total',
      dataIndex: 'subTotal',
      key: 'subTotal',
    },
  ];

  return {
    breadcrumbItem,
    orderDetail,
    OrderItemsTableProps,
  };
}
