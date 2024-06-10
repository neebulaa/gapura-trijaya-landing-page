import { IProduct } from '@/types/product';

export type ShopDetailFormProps = {
  productDetailData: IProduct | any;
  isPending?: boolean;
  refetch?: () => void;
  selectedVariant?: IProduct | null;
  setSelectedVariant?: (variant: IProduct) => void;
};
