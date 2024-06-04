import { useGetProducts } from '@/services/queries/product.query';
import { QueryParams } from '@/types/base';
import { useEffect, useState } from 'react';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';

export default function useCatalogController() {
  /**
   * State
   */
  const [gridSystem, setGridSystem] = useState<string>('columns');
  const [searchParams, setSearchParams] = useSearchParams();
  const [productQueryParams, setProductQueryParams] = useState<QueryParams>({
    page: +(searchParams.get('page') ?? 1),
    limit: +(searchParams.get('limit') ?? 3),
    // orderBy: 'id',
    // sortBy: sortBy.DESC,
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
   * Handle Product Catalog Page Change
   */
  const handleProductCatalogPageChange = (page: number) => {
    setProductQueryParams((prev) => ({ ...prev, page }));
  };

  /**
   * Effects
   */
  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setSearchParams(productQueryParams as URLSearchParamsInit);
  }, [productQueryParams]);

  return {
    gridSystem,
    setGridSystem,
    productQueryParams,
    setProductQueryParams,
    productsData,
    productsDataIsFetching,
    getProducts,
    handleProductCatalogPageChange,
  };
}
