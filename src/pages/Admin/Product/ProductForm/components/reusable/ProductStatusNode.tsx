import { ProductStatus, getStatusString } from '@/types/enum/product-status.enum';
import { Tag } from 'antd';

export default function ProductStatusNode({ status }: { status: ProductStatus }) {
  return (
    <>
      {status !== null ? (
        <Tag
          color={
            status === ProductStatus.ACTIVE
              ? 'success'
              : status === ProductStatus.INACTIVE
              ? 'error'
              : 'default'
          }
        >
          {getStatusString(status)}
        </Tag>
      ) : (
        '-'
      )}
    </>
  );
}
