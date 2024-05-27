import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';

type Props = {
  disabled?: boolean;
} & LinkProps;

const ToggleableLink: FC<Props> = (props) => {
  const { disabled = false, ...rest } = props;
  return (
    <>{disabled ? props.children : <Link {...rest}>{props.children}</Link>}</>
  );
};

export default ToggleableLink;
