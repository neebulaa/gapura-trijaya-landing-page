import { INotification } from '@/types/global/notification';

export type OutletContextInterface = {
  openNotification: (notificationDto: INotification) => void;
  handleTitle: (data: string) => void;
  handleIndex: (status: boolean) => void;
  handlePrevRoute: (data: string | number) => void;
};
