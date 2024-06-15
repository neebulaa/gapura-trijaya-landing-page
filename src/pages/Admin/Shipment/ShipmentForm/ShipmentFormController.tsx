import { separator } from '@/commons/utils/Currency/Currency';
import { useGetShipment, useUpdateShipment } from '@/services/queries/admin/shipment.query';
import { IValidationErrors } from '@/types/base';
import { FormType, IFormProps } from '@/types/global/form';
import { OutletContextInterface } from '@/types/global/outletContext';
import { UpdateShipmentDto } from '@/types/order';
import { Form } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useOutletContext, useParams } from 'react-router-dom';

export default function useShipmentFormController(props: IFormProps) {
  const { formType } = props;
  const { id } = useParams();
  const { openNotification } = useOutletContext<OutletContextInterface>();

  /**
   * State
   */
  const [form] = Form.useForm();
  const [validationErrors, setValidationErrors] = useState<IValidationErrors | null>({
    message: '',
    errors: {},
  });

  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    { title: 'Home' },
    { title: <Link to="/admin/shipments">Shipment</Link> },
    { title: `${formType == FormType.CREATE ? 'Add' : 'Edit'} Shipment` },
  ];

  /**
   * Query Model: Get One Shipment
   */
  const {
    data: shipmentData,
    isFetching: shipmentDataIsFetching,
    isError: shipmentDataIsError,
  } = useGetShipment(id!, {
    enabled: formType == FormType.UPDATE,
  });

  /** Query Model: Update Shipment */
  const { mutateAsync: mutateUpdateShipment, isPending: mutateUpdateShipmentIsLoading } =
    useUpdateShipment(id!);

  /**
   * Handle Form Submit: Create or Update Shipment
   */
  const handleFormSubmit = () => {
    form.validateFields();
    // const values = form.getFieldsValue();

    const params: UpdateShipmentDto = {
      trackNumber: form.getFieldValue('trackNumber'),
    };

    // Do update
    mutateUpdateShipment(params)
      .then((res) => {
        setValidationErrors(null);
        openNotification({
          type: 'success',
          title: 'Success',
          message: res.message as string,
          // message: 'Category has been created successfully.',
        });
      })
      .catch((err) => {
        if (err.response && err.response.status === 422)
          setValidationErrors(err.response.data.errors);

        openNotification({
          type: 'error',
          title: 'Error',
          message: err?.response.data.message,
        });
        console.log('err:', err);
      });
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (shipmentData && formType == FormType.UPDATE) {
      form.setFieldsValue(shipmentData?.data);
    }
  }, [shipmentData]);

  /**
   * Table Columns Props: Shipment Order Items
   */
  const ShipmentOrderItemsTableProps = [
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
    shipmentData,
    shipmentDataIsFetching,
    shipmentDataIsError,
    ShipmentOrderItemsTableProps,
    form,
    handleFormSubmit,
    mutateUpdateShipmentIsLoading,
    validationErrors,
  };
}
