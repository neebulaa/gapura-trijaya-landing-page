/**
 * Enum: Status
 * Usage:
 * - ProductStatus.DRAFT // Output: 0
 * - ProductStatus.ACTIVE // Output: 1
 * - ProductStatus.INACTIVE // Output: 2
 */
export enum ProductStatus {
  DRAFT = 0,
  ACTIVE = 1,
  INACTIVE = 2,
}

export const STATUSES: { [key in ProductStatus]: string } = {
  [ProductStatus.DRAFT]: 'draft',
  [ProductStatus.ACTIVE]: 'active',
  [ProductStatus.INACTIVE]: 'inactive',
};

/**
 * Get Status String
 * Usage:
 * - getStatusString(ProductStatus.DRAFT) // Output: 'draft'
 * - getStatusString(ProductStatus.ACTIVE) // Output: 'active'
 * - getStatusString(ProductStatus.INACTIVE) // Output: 'inactive'
 */
export function getStatusString(status: ProductStatus): string {
  return STATUSES[status];
}
