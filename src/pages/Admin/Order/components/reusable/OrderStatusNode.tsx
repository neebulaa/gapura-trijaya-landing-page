import { OrderStatus, getOrderStatusString } from '@/types/enum/order-status.enum';
import { Tag } from 'antd';

export default function OrderStatusNode({ status }: { status: OrderStatus }) {
  return (
    <>
      {status !== null ? (
        <Tag
          color={
            status === OrderStatus.CREATED
              ? 'success'
              : status === OrderStatus.DELIVERED
                ? 'info'
                : 'default'
          }
        >
          {getOrderStatusString(status)}
        </Tag>
      ) : (
        '-'
      )}
    </>
  );
}
