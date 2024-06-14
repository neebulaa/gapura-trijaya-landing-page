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
                ? 'blue'
                : status === OrderStatus.CONFIRMED
                  ? 'purple'
                  : status === OrderStatus.CANCELLED
                    ? 'error'
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
