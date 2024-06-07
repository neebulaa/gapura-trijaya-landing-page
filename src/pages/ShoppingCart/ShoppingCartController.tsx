import useCartStore from '@/commons/store/useCartStore';
import { useDeleteCart, useGetCarts, useUpdateCart } from '@/services/queries/cart.query';
import { ICart } from '@/types/cart';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default function useShoppingCartController() {
  /**
   * State
   */
  const [cartDataState, setCartDataState] = useState<ICart | null>(null);
  const { items, setItem, removeItem } = useCartStore((state) => state);
  // const { cartItemIdState, setCartItemIdState } = useState<string>('');

  /**
   * Query Get Cart
   */
  const {
    data: cartData,
    isFetching: cartDataIsFetching,
    refetch: cartDataIsRefetch,
  } = useGetCarts();

  /**
   * Query Update Cart
   */
  const { mutateAsync: mutateUpdateCart, isPending: mutateUpdateCartIsFetching } = useUpdateCart();

  /** Query Remove Cart */
  const { mutateAsync: mutateRemoveCart, isPending: mutateRemoveCartIsFetching } = useDeleteCart();

  /**
   * Handle Increment Quantity
   */
  const handleIncrementQuantity = async (cartItemId: string, qty: number) => {
    const updatedCart = {
      quantity: qty + 1,
    };
    await mutateUpdateCart({ updatedCart, id: cartItemId });
  };

  /**
   * Handle Decrement Quantity
   */
  const handleDecrementQuantity = async (cartItemId: string, qty: number) => {
    if (qty === 1) {
      message.warning('Minimum quantity is 1');
      return;
    }
    const updatedCart = {
      quantity: qty > 1 ? qty - 1 : 1,
    };
    await mutateUpdateCart({ updatedCart, id: cartItemId });
  };

  /**
   * Handle Remove Item
   */
  const handleRemoveItem = async (cartId: string) => {
    await mutateRemoveCart(cartId);
  };

  /**
   * Effects
   */
  useEffect(() => {
    setCartDataState((cartData?.data as any) || null);
    setItem((cartData?.data as any)?.items || []);
  }, [cartData]);

  // useEffect(() => {}, []);

  // Calculate subtotal
  const subtotal =
    (cartData?.data as any)?.items!.reduce(
      (acc: any, item: any) => acc + item.product.price * item.quantity,
      0
    ) || 0;
  // Define shipping cost
  const shippingCost = 0; // Adjust this value as needed
  // Calculate total
  const total = subtotal + shippingCost;

  return {
    cartDataState,
    setCartDataState,
    cartData,
    cartDataIsFetching,
    cartDataIsRefetch,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveItem,
    mutateUpdateCartIsFetching,
    mutateRemoveCartIsFetching,
    subtotal,
    shippingCost,
    total,
  };
}
