type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type INotification = {
  type: NotificationType;
  title: string;
  message: string;
  duration?: number;
};
