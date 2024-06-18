// types/enum/shipment-status.enum.ts
// Version 2
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


// Version 1
// export enum ShipmentStatus {
//   PENDING= 'pending',
//   SHIPPED = 'shipped',
// }

// export const STATUSES: { [key in ShipmentStatus]: string } = {
//   [ShipmentStatus.PENDING]: 'pending',
//   [ShipmentStatus.SHIPPED]: 'shipped
// };

// export function getShipmentStatusString(status: ShipmentStatus): string {
//   return STATUSES[status];
// }