import { useGetProducts } from '@/services/queries/product.query';
import { QueryParams } from '@/types/base';
import { useEffect, useState } from 'react';

export default function useCatalogController() {
  /**
   * State
   */
  const [gridSystem, setGridSystem] = useState<string>('columns');
  const [productQueryParams, setProductQueryParams] = useState<QueryParams>({
    page: 1,
    limit: 10,
  });

  /**
   * Query
   */
  const { data: productsData, isFetching: productsDataIsFetching } =
    useGetProducts(productQueryParams);

  /**
   * Get Products
   */
  const getProducts = async () => {
    console.log('getProducts');
  };

  /**
   * Effects
   */
  useEffect(() => {
    getProducts();
  }, []);

  return {
    gridSystem,
    setGridSystem,
    productQueryParams,
    setProductQueryParams,
    productsData,
    productsDataIsFetching,
    getProducts,
  };
}
