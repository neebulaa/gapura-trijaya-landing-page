import { useProductStore } from '@/commons/store/useProductStore';
import { useGetProductBySlug } from '@/services/queries/product.query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function useShopDetailController() {
  const { slug } = useParams();

  /**
   * State
   */
  const { selectedVariant, setSelectedVariant } = useProductStore((state) => state);

  /**
   * Queries
   */
  const {
    data: productDetailData,
    isPending: productDetailDataIsFetching,
    refetch: productDetailDataIsRefetch,
  } = useGetProductBySlug(slug!);

  /**
   * Effects
   */
  useEffect(() => {
    if (productDetailData) {
      setSelectedVariant(productDetailData?.data);
    }
  }, [productDetailData]);

  return {
    productDetailData,
    productDetailDataIsFetching,
    productDetailDataIsRefetch,
    selectedVariant,
    setSelectedVariant,
  };
}
