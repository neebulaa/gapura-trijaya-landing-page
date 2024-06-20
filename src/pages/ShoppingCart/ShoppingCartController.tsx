import useCartStore from '@/commons/store/useCartStore';
import { message } from 'antd';
import { useGetPublicPromoByCode, useGetPublicPromos } from '@/services/queries/promo.query.ts';
import { useEffect, useState } from 'react';
import { IPromo, PromoQuery, PromoTypeEnum } from '@/types/promo.ts';
import { debounce } from '@/commons/utils/Debounce.ts';

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
    promoValue: cartPromo,
    appliedVoucher,
    applyVoucher,
    resetVoucher,
    calculateCart,
  } = useCartStore((state) => state);
  // const { cartItemIdState, setCartItemIdState } = useState<string>('');
  const [openMyCouponModal, setOpenMyCouponModal] = useState(false);

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
   * Get Promo
   */
  const [promoQuery, setPromoQuery] = useState<PromoQuery>({
    page: 1,
    limit: 50,
    promoType: PromoTypeEnum.CODE,
  });
  const { data: promoDataQuery, isFetching: promoDataIsFetchingQuery } = useGetPublicPromos(
    promoQuery,
    true,
  );

  /**
   * Handle Apply Promo
   */
  const handleApplyPromo = async (promoCode: string, isModal: boolean = false) => {
    const findVoucher = promoDataQuery?.data?.find((promo) => promo.code === promoCode);
    if (!findVoucher) {
      message.error('Promo code not found');
      return;
    }
    applyVoucher(findVoucher || ({} as IPromo));

    if (isModal) {
      setTimeout(() => {
        setOpenMyCouponModal(false);
      }, 200);
    }
  };

  /**
   * Handle Reset Promo
   */
  const handleResetPromo = async () => {
    resetVoucher();
  };

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
    handleApplyPromo,
    openMyCouponModal,
    setOpenMyCouponModal,
    promoDataQuery,
    promoDataIsFetchingQuery,
    appliedVoucher,
    handleResetPromo,
    cartPromo,
  };
}
