import usePageEffect from '@/commons/hooks/usePageEffect';
import useShipmentDetailController from '@/pages/Admin/Shipment/ShipmentDetail/ShipmentDetailController';
import { Breadcrumb, Card } from 'antd';

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
      <Card>
        <div>Shipment Detail</div>
      </Card>
    </>
  );
}
