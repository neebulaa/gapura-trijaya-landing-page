// types/enum/shipment-status.enum.ts
export enum ShipmentStatus {
  PENDING = 'pending',
  SHIPPED = 'shipped',
}

export const getShipmentStatusString = (status: ShipmentStatus) => {
  switch (status) {
    case ShipmentStatus.PENDING:
      return 'pending';
    case ShipmentStatus.SHIPPED:
      return 'shipped';
    default:
      return 'unknown';
  }
};
