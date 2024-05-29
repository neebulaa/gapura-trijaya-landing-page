import { CreateAttributeOptionDto, UpdateAttributeOptionDto } from '@/types/attributeOption';

export interface IAttributeOptionModal {
  isOpen?: boolean;
  //   handleOk?: (type: 'Create' | 'Edit', id?: number) => void;
  handleOk?: (value: CreateAttributeOptionDto | UpdateAttributeOptionDto) => void;
  handleCancel?: () => void;
  confirmLoading?: boolean;
  // mutateCreateAttributeOptionIsLoading?: boolean;
  modalState?: IAttributeOptionModalState;
}

export interface IAttributeOptionModalState {
  isOpen?: boolean;
  formMode?: 'Create' | 'Edit';
}
