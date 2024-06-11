import { Col } from 'antd';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  toggleShow: boolean;
}

/**
 * Must Wrapped inside Ant Design Row because this component contain
 * Col md={24}
 * @param props
 * @returns FadeInDownCollape Component
 */
export default function FadeInDownCollape(props: Props) {
  const { children, toggleShow } = props;
  return (
    <Col className={['py-2', ...(toggleShow ? [] : ['hidden'])].join(' ')}>
      <motion.div
        layout="position"
        animate={toggleShow ? 'open' : 'closed'}
        variants={{
          open: { opacity: 1, x: 0 },
          closed: { opacity: 0, x: '-100%' },
        }}
        transition={{
          type: 'tween',
          ease: 'anticipate',
          duration: 0.25,
        }}
      >
        {children}
      </motion.div>
    </Col>
  );
}
