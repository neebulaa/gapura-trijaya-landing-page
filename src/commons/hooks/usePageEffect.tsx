import { OutletContextInterface } from '@/types/global/outletContext';
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

type Props = {
  index: boolean;
  title: string;
  prevRoute?: string | number;
  docTitle?: string;
};

const usePageEffect = (props: Props) => {
  const { index, title, prevRoute, docTitle } = props;

  const { handleIndex, handlePrevRoute, handleTitle } = useOutletContext<OutletContextInterface>();

  useEffect(() => {
    handleIndex(index);
    handleTitle(title);
    if (prevRoute) {
      handlePrevRoute(prevRoute);
    }
    document.title = `Trijaya${docTitle ? ` - ${docTitle}` : ''}`;
  }, []);
};

export default usePageEffect;
