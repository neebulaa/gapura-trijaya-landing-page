import { CreatePromoDetailDto, UpdatePromoDetailDto } from '@/types/promo.ts';
import { FormType } from '@/types/global/form.ts';

export interface PromoQuantityProductModalProps {
  isOpen: boolean;
  type?: FormType;
  tempDetails?: CreatePromoDetailDto[] | UpdatePromoDetailDto[];
  data?: CreatePromoDetailDto | UpdatePromoDetailDto;
  handleCancel?: () => void;
  handleOk?: (data: CreatePromoDetailDto | UpdatePromoDetailDto, type?: FormType) => void;
}
