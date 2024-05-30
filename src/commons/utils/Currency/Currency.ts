// export const separator = (value: any) => {
//   // return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0
//   // return x

//   if (!value) return '0';
//   var parts = value.toFixed(0).toString().split('.');
//   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
//   return parts.join(',');
// };

/**
 * Support for decimal or float number
 * @param value int|decimal|float
 * @returns
 */
export const separator = (value: any, showDecimal: boolean = false) => {
  if (value === null || value === undefined) return '0';

  const stringValue = value.toString();
  const parts = stringValue.split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  if (!showDecimal) {
    return parts[0];
  }

  return parts.join(',');
};
