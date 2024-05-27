import { Button, Tooltip } from 'antd';
import { ButtonProps } from 'antd/lib/button/button';
import { CSSProperties, useState } from 'react';

interface Props extends ButtonProps {
  hoverMessage?: string;
  status?: 'warning' | 'danger' | 'success' | 'default';
  style?: CSSProperties;
}

export default function ActionButton(props: Props) {
  const {
    hoverMessage = 'This is Default Tooltips',
    status,
    style,
    type = 'primary',
    icon,
    shape,
    size,
    disabled,
    loading,
    prefixCls,
    className,
    ghost,
    danger,
    block,
    children,
    href,
    target,
    htmlType,
    onClick,
  } = props;

  const [extraClassName] = useState(
    status === 'danger'
      ? 'btn-danger'
      : status === 'warning'
      ? 'btn-warning'
      : status === 'success'
      ? 'btn-success'
      : ''
  );

  return (
    <Tooltip title={hoverMessage}>
      <Button
        style={{ ...style, marginRight: '0.375rem', marginLeft: '0.375rem' }}
        type={type}
        icon={icon}
        shape={shape}
        size={size}
        disabled={disabled}
        loading={loading}
        prefixCls={prefixCls}
        className={`${className ? className : ''}${
          extraClassName ? extraClassName : ''
        }`}
        ghost={ghost}
        danger={danger}
        block={block}
        children={children}
        href={href}
        target={target}
        htmlType={htmlType}
        onClick={onClick}
      />
    </Tooltip>
  );
}
