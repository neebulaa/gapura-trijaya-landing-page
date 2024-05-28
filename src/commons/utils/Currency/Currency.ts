export const separator = (value: any) => {
  // return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : 0
  // return x

  if (!value) return '0';
  var parts = value.toFixed(0).toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts.join(',');
};
