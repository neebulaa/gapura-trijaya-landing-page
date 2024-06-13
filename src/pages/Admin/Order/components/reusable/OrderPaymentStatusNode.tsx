import { OrderPaymentStatus, getPaymentStatusString } from '@/types/enum/order-status.enum';
import { Tag } from 'antd';

export default function OrderPaymentStatusNode({ status }: { status: OrderPaymentStatus }) {
  return (
    <>
      {status !== null ? (
        <Tag
          color={
            status === OrderPaymentStatus.PAID
              ? 'success'
              : status === OrderPaymentStatus.UNPAID
                ? 'error'
                : 'default'
          }
        >
          {getPaymentStatusString(status)}
        </Tag>
      ) : (
        '-'
      )}
    </>
  );
}
