import { Col, ColProps } from 'antd';

export default function ResponsiveCol(props: ColProps) {
  const {
    children,
    span = 24,
    md = 12,
    lg,
    xl,
    xxl,
    push = 0,
    pull = 0,
    order = 0,
    offset = 0,
    flex,
    ...rest
  } = props;

  return (
    <Col
      span={span}
      md={md}
      lg={lg}
      xl={xl}
      xxl={xxl}
      push={push}
      pull={pull}
      order={order}
      offset={offset}
      flex={flex}
      {...rest}
    >
      {children}
    </Col>
  );
}
