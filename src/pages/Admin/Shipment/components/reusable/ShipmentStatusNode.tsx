import { ShipmentStatus, getShipmentStatusString } from '@/types/enum/shipment-status.enum';
import { Tag } from 'antd';

export default function ShipmentStatusNode({ status }: { status: ShipmentStatus }) {
  return (
    <>
      {status !== null ? (
        <Tag
          color={
            status === ShipmentStatus.PENDING
              ? 'gold'
              : status === ShipmentStatus.SHIPPED
                ? 'green'
                : 'default'
          }
        >
          {getShipmentStatusString(status)}
        </Tag>
      ) : (
        '-'
      )}
    </>
  );
}
