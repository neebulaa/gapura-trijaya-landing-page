import { Link } from "react-router-dom";

export default function useShipmentDetailController() {
  /**
   * Breadcrumb
   */
  const breadcrumbItem = [
    { title: 'Home' },
    { title: <Link to="/admin/shipments">Shipment</Link> },
    { title: `Detail` },
  ];

  return {
    breadcrumbItem,
  };
}
