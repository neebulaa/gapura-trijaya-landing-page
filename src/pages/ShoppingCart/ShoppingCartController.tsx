import useCartStore from '@/commons/store/useCartStore';
import { message } from 'antd';

export default function useShoppingCartController() {
  /**
   * State
   */
  const {
    items: cartData,
    updateItem: updateItemCart,
    removeItem: removeItemCart,
    isLoading: cartDataIsFetching,
    subTotal: cartSubTotal,
    total: cartTotal,
  } = useCartStore((state) => state);
  // const { cartItemIdState, setCartItemIdState } = useState<string>('');

  /**
   * ================================
   *
   * ============= NOTE =============
   * Since we are using Zustand, we don't need to use the following queries
   * - useGetCarts
   * - useUpdateCart
   * - useDeleteCart
   * ================================
   */

  /**
   * Query Get Cart
   */
  // const {
  //   data: cartDataQuery,
  //   isFetching: cartDataIsFetchingQuery,
  //   refetch: cartDataIsRefetch,
  // } = useGetCarts();

  /**
   * Query Update Cart
   */
  // const { mutateAsync: mutateUpdateCart, isPending: mutateUpdateCartIsFetching } = useUpdateCart();

  /** Query Remove Cart */
  // const { mutateAsync: mutateRemoveCart, isPending: mutateRemoveCartIsFetching } = useDeleteCart();

  /**
   * Handle Increment Quantity
   */
  const handleIncrementQuantity = async (cartItemId: string, qty: number) => {
    const updateQty = qty + 1;
    updateItemCart(cartItemId, updateQty);
  };

  /**
   * Handle Decrement Quantity
   */
  const handleDecrementQuantity = async (cartItemId: string, qty: number) => {
    if (qty === 1) {
      message.warning('Minimum quantity is 1');
      return;
    }
    const updateQty = qty > 1 ? qty - 1 : 1;
    updateItemCart(cartItemId, updateQty);
  };

  /**
   * Handle Remove Item
   */
  const handleRemoveItem = async (cartId: string) => {
    removeItemCart(cartId);
  };

  // Calculate subtotal
  // const subtotal =
  //   (cartData as any)?.reduce((acc: any, item: any) => acc + item.price * item.quantity, 0) || 0;
  // // Define shipping cost
  // const shippingCost = 0; // Adjust this value as needed
  // // Calculate total
  // const total = subtotal + shippingCost;

  return {
    cartData,
    cartDataIsFetching,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveItem,
    cartSubTotal,
    // shippingCost,
    cartTotal,
  };
}
