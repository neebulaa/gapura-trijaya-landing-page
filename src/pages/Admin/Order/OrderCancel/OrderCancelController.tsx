import { separator } from '@/commons/utils/Currency/Currency';
import { useGetOrder } from '@/services/queries/admin/order.query';
import { IValidationErrors } from '@/types/base';
import { Form } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function useOrderCancelController() {
  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    { title: 'Home' },
    { title: <Link to="/admin/orders">Order</Link> },
    { title: `Cancel` },
  ];

  const { id } = useParams();

  /**
   * State
   */
  const [form] = Form.useForm();
  const [validationErrors, setValidationErrors] = useState<IValidationErrors | null>({
    message: '',
    errors: {},
  });

  /**
   * Query Model Get One Order
   */
  const {
    data: orderData,
    isPending: orderDataIsFetching,
    refetch: orderDataIsRefetch,
  } = useGetOrder(id!, { enabled: true });

  /**
   * Handle Form Submit: Cancel Order
   */
  const handleFormSubmit = () => {
    form.validateFields();
    // const values = form.getFieldsValue();

    // Do cancel
  };

  /**
   * Table Columns Props: Shipment Order Items
   */
  const OrderItemsTableProps = [
    { title: '#', dataIndex: 'sku', key: 'sku' },
    { title: 'Item', dataIndex: 'name', key: 'name' },
    { title: 'Qty', dataIndex: 'qty', key: 'qty' },
    {
      title: 'Total',
      dataIndex: 'subTotal',
      key: 'subTotal',
      render: (text: number) => `Rp ${separator(text)}`,
    },
  ];

  return {
    breadcrumbItem,
    form,
    validationErrors,
    orderData,
    orderDataIsFetching,
    orderDataIsRefetch,
    OrderItemsTableProps,
    handleFormSubmit,
  };
}
