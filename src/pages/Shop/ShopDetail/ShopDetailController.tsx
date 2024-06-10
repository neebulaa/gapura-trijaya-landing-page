import { useGetProductBySlug } from '@/services/queries/product.query';
import { IProduct } from '@/types/product';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function useShopDetailController() {
  const { slug } = useParams();

  /**
   * State
   */
  // const { selectedProduct, setProducts } = useProductStore((state) => state);
  const [selectedVariant, setSelectedVariant] = useState<IProduct | null>(null);

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
