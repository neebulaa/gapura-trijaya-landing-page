import { useGetProductBySlug } from '@/services/queries/product.query';
import { useParams } from 'react-router-dom';

export default function useShopDetailController() {
  const { slug } = useParams();

  /**
   * State
   */
  //   const [product, setProduct] = useState<IProduct | null>(null);
  //   const [category, setCategory] = useState<Category | null>(null);

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

  return {
    productDetailData,
    productDetailDataIsFetching,
    productDetailDataIsRefetch,
  };
}
