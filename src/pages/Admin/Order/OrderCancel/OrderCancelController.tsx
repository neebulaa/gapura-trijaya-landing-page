import { separator } from '@/commons/utils/Currency/Currency';
import { useCancelOrder, useGetOrder } from '@/services/queries/admin/order.query';
import { IValidationErrors } from '@/types/base';
import { OutletContextInterface } from '@/types/global/outletContext';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';

export default function useOrderCancelController() {
  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    { title: 'Home' },
    { title: <Link to="/admin/orders">Order</Link> },
    { title: `Cancel` },
  ];

  const { openNotification } = useOutletContext<OutletContextInterface>();

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
   * Query Model: Cancel Order
   */
  const { mutateAsync: mutateCancelOrder, isPending: mutateCancelOrderIsLoading } = useCancelOrder(
    id!,
  );

  /**
   * Handle Form Submit: Cancel Order
   */
  const handleFormSubmit = () => {
    form.validateFields();
    const values = form.getFieldsValue();

    // Do cancel
    mutateCancelOrder(values)
      .then((res: any) => {
          openNotification({
            type: 'success',
            title: 'Success',
            message: res.message as string,
            // message: 'Category has been created successfully.',
          });
      })
      .catch((err: any) => {
          openNotification({
            type: 'error',
            title: 'Error',
            message: err?.response.data.message,
          });
      });
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (orderData) {
      form.setFieldsValue({
        cancellationNote: orderData?.data?.cancellationNote,
      });
    }
  }, [orderData]);

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
