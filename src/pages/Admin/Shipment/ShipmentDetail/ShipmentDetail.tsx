import usePageEffect from '@/commons/hooks/usePageEffect';
import useShipmentDetailController from '@/pages/Admin/Shipment/ShipmentDetail/ShipmentDetailController';
import { Breadcrumb } from 'antd';

export default function ShipmentDetail() {
  /** Controller */
  const { breadcrumbItem } = useShipmentDetailController();

  usePageEffect({
    index: false,
    title: `Shipment Detail`,
    prevRoute: -1,
  });

  return (
    <>
      <Breadcrumb items={breadcrumbItem} />
      <h1>Shipment Detail</h1>
    </>
  );
}
