/**
 * Represents the status of an order.
 * Usage:
 * - OrderStatus.CREATED // Output: 'created'
 * - OrderStatus.CONFIRMED // Output: 'confirmed'
 * - OrderStatus.DELIVERED // Output: 'delivered'
 * - OrderStatus.COMPLETED // Output: 'completed'
 * - OrderStatus.CANCELLED // Output: 'cancelled'
 * @enum {string}
 */
export enum OrderStatus {
  CREATED = 'created',
  CONFIRMED = 'confirmed',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export const STATUSES: { [key in OrderStatus]: string } = {
  [OrderStatus.CREATED]: 'created',
  [OrderStatus.CONFIRMED]: 'confirmed',
  [OrderStatus.DELIVERED]: 'delivered',
  [OrderStatus.COMPLETED]: 'completed',
  [OrderStatus.CANCELLED]: 'cancelled',
};

/**
 * Returns the status string for the given order status.
 * @param status - The order status.
 * @returns The status string.
 *
 * Usage:
 * - getStatusString(OrderStatus.CREATED) // Output: 'created'
 * - getStatusString(OrderStatus.CONFIRMED) // Output: 'confirmed'
 * - getStatusString(OrderStatus.DELIVERED) // Output: 'delivered'
 * - getStatusString(OrderStatus.COMPLETED) // Output: 'completed'
 * - getStatusString(OrderStatus.CANCELLED) // Output: 'cancelled'
 */
export function getOrderStatusString(status: OrderStatus): string {
  return STATUSES[status];
}

/**
 |
 | Enum: OrderPaymentStatus
 |
 */

/**
 * Represents the payment status of an order.
 *
 * Usage:
 * - OrderPaymentStatus.PAID // Output: 'paid'
 * - OrderPaymentStatus.UNPAID // Output: 'unpaid'
 * - OrderPaymentStatus.PENDING // Output: 'pending'
 * - OrderPaymentStatus.FAILED // Output: 'failed'
 * @enum {string}
 */
export enum OrderPaymentStatus {
  PAID = 'paid',
  UNPAID = 'unpaid',
  PENDING = 'pending',
  FAILED = 'failed',
}

export const PAYMENT_STATUSES: { [key in OrderPaymentStatus]: string } = {
  [OrderPaymentStatus.PAID]: 'paid',
  [OrderPaymentStatus.UNPAID]: 'unpaid',
  [OrderPaymentStatus.PENDING]: 'pending',
  [OrderPaymentStatus.FAILED]: 'failed',
};

/**
 * Returns the payment status string for the given order payment status.
 * @param status - The order payment status.
 * @returns The payment status string.
 *
 * Usage:
 * - getPaymentStatusString(OrderPaymentStatus.PAID) // Output: 'paid'
 * - getPaymentStatusString(OrderPaymentStatus.UNPAID) // Output: 'unpaid'
 * - getPaymentStatusString(OrderPaymentStatus.PENDING) // Output: 'pending'
 * - getPaymentStatusString(OrderPaymentStatus.FAILED) // Output: 'failed'
 */
export function getPaymentStatusString(status: OrderPaymentStatus): string {
  return PAYMENT_STATUSES[status];
}
