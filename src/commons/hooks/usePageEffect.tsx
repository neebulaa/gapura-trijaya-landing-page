import { OutletContextInterface } from '@/types/global/outletContext';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

type Props = {
  index: boolean;
  title: string;
  prevRoute?: string | number;
};

const usePageEffect = (props: Props) => {
  const { index, title, prevRoute } = props;

  const { handleIndex, handlePrevRoute, handleTitle } =
    useOutletContext<OutletContextInterface>();

  useEffect(() => {
    handleIndex(index);
    handleTitle(title);
    if (prevRoute) {
      handlePrevRoute(prevRoute);
    }
  }, []);
};

export default usePageEffect;
