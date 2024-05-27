export enum FormType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}

export interface IFormProps {
  formType: FormType;
}