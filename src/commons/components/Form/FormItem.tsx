import { Form, FormItemProps } from 'antd';

interface WrapperFormItemProps extends FormItemProps {
  label: string;
  name: string;
  rules?: any[];
  validationErrors?: any;
}

export default function FormItem(props: WrapperFormItemProps) {
  const { label, name, rules, validationErrors, children, ...rest } = props;
  const errors = validationErrors?.[name];

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
      validateStatus={errors ? 'error' : 'success'}
      help={
        errors ? (
          <ul>
            {errors.map((error: string, index: number) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        ) : null
      }
      {...rest}
    >
      {children}
    </Form.Item>
  );
}
