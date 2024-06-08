import IconCoupon from '@/commons/assets/icons/IconCoupon';
import IconMinus from '@/commons/assets/icons/IconMinus';
import IconPlus from '@/commons/assets/icons/IconPlus';
import IconPoin from '@/commons/assets/icons/IconPoin';
import PageHeader from '@/commons/components/Layout/HomeLayout/PageHeader';
import { ApiImgUrl } from '@/commons/utils/ApiImgUrl';
import { separator } from '@/commons/utils/Currency/Currency';
import useShoppingCartController from '@/pages/ShoppingCart/ShoppingCartController';
import ToggleCheckboxButton from '@/pages/ShoppingCart/components/ToggleCheckboxButton';
import { ICartItem } from '@/types/cart';
import { Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom';

export default function ShoppingCart() {
  const {
    cartDataState,
    setCartDataState,
    cartData,
    cartDataIsFetching,
    cartDataIsRefetch,
    handleIncrementQuantity,
    handleDecrementQuantity,
    handleRemoveItem,
    subtotal,
    shippingCost,
    total,
  } = useShoppingCartController();

  const buttonCheckoutIsDisabled = !((cartData?.data as any)?.items?.length > 0);

  return (
    <>
      <PageHeader title="Shopping Cart" navigations={['Home', 'Shopping Cart']} />
      <section className="container" id="shopping-cart">
        <div className="table-container">
          <section className="shopping-cart-table">
            <header className="table-header">
              <h5>Product</h5>
              <h5>Price</h5>
              <h5>Quantity</h5>
              <h5>Subtotal</h5>
              <h5></h5>
            </header>
            <section className="table-body">
              {/* Looping cart here */}
              {cartDataIsFetching ? (
                <Skeleton />
              ) : (
                <>
                  {!(cartData?.data as any)?.items ||
                  (cartData?.data as any)?.items!.length === 0 ? (
                    <div className="table-body-row">
                      <h4 className="semibold">No items in cart</h4>
                    </div>
                  ) : (
                    <>
                      {(cartData?.data as any)?.items!.map((cart: ICartItem) => (
                        <div className="table-body-row" key={cart.id}>
                          <div className="table-body-col">
                            {cart?.product.images?.length ? (
                              <img
                                src={ApiImgUrl(cart?.product.images[0].path)}
                                alt={cart?.product.name}
                              />
                            ) : (
                              <img src={`/noimg.png`} alt={cart?.product.name} />
                            )}
                            <h4 className="semibold">
                              <Link to={`/shop/${cart?.product.slug}`}>{cart?.product.name}</Link>
                            </h4>
                          </div>
                          <div className="table-body-col">{`Rp ${separator(
                            cart?.product.price
                          )}`}</div>
                          <div className="table-body-col">
                            <button
                              className="btn btn-empty btn-quantity no-hover no-pointer"
                              style={{
                                padding: '.5rem',
                              }}
                            >
                              <div
                                className="btn btn-circle btn-tertiary"
                                style={{
                                  width: '30px',
                                  height: '30px',
                                }}
                                onClick={() => handleDecrementQuantity(cart.id!, cart.quantity!)}
                              >
                                <IconMinus width="8" height="2" />
                              </div>
                              <p>{cart?.quantity}</p>
                              <div
                                className="btn btn-circle btn-tertiary"
                                style={{
                                  width: '30px',
                                  height: '30px',
                                }}
                                onClick={() => handleIncrementQuantity(cart.id!, cart.quantity!)}
                              >
                                <IconPlus width="10" height="10" />
                              </div>
                            </button>
                          </div>
                          <div className="table-body-col semibold">{`Rp ${separator(
                            cart.product?.price * cart?.quantity
                          )}`}</div>
                          <div className="table-body-col">
                            <button
                              onClick={() => handleRemoveItem(cart.id!)}
                              className="btn btn-circle btn-empty"
                              style={{
                                width: '30px',
                                height: '30px',
                              }}
                            >
                              x
                            </button>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
              {/* ./Looping cart here */}
            </section>
            <section className="table-footer">
              <Link to="/shop">
                <button className="btn btn-tertiary">Return to shop</button>
              </Link>
            </section>
          </section>
        </div>

        <section className="shopping-cart-detail mt-2">
          <div className="card-coupon flex flex-col gap-1">
            <div className="card-bordered">
              <div className="flex items-center justify-between mb-1">
                <h2>Add new coupon</h2>
                <p
                  className="pointer highlight semibold"
                  // onClick={() => setOpenMyCouponModal(true)}
                >
                  My coupons
                </p>
              </div>
              <div className="input-icon">
                {/* Applied coupon */}
                {/* <div className="mt-05 mb-05 ml-05 mr-05 semibold badge badge-primary badge-border word-nowrap">
									TRJ00001 (-5%)
								</div> */}
                <IconCoupon width="24" height="24" className="ml-1" />
                <input placeholder="Enter Voucher" type="text" className="tj-input" />
                <p className="highlight semibold ml-auto mr-1 cursor-pointer">Apply</p>
              </div>
            </div>
            <div className="card-bordered">
              <h2 className="mb-1">Apply your coin</h2>
              <div className="input-icon">
                <IconPoin width="24" height="24" className="ml-1" />
                <p className="tj-input border-none">8022 Poins</p>
                <p className="ml-auto mr-1">
                  <ToggleCheckboxButton className="cursor-pointer" />
                </p>
              </div>
            </div>
          </div>

          <div className="cart-total">
            {cartDataIsFetching ? (
              <Skeleton />
            ) : (
              <>
                <h2>Card Total</h2>
                <div className="content-split mt-1-05 justify-between">
                  <h5>Subtotal: </h5>
                  <p className="medium">Rp {separator(subtotal)}</p>
                </div>
                <hr className="mt-1" />
                <div className="content-split mt-1 justify-between">
                  <h5>Shipping: </h5>
                  <p className="medium">Rp {separator(shippingCost)}</p>
                </div>
                <hr className="mt-1" />
                <div
                  className="content-split mt-1 justify-between semibold"
                  style={{ fontSize: '1.125rem' }}
                >
                  <h5>Total: </h5>
                  <p>{`Rp ${separator(total)}`}</p>
                </div>
                <Link to="/order/checkout">
                  {/* <button className="btn btn-full w-100 mt-1-05">Proceed to checkout</button> */}
                  <Button
                    type="primary"
                    className="w-full mt-4 shadow-none rounded-full bg-primary"
                    size="large"
                    disabled={buttonCheckoutIsDisabled}
                  >
                    Proceed to checkout
                  </Button>
                </Link>
              </>
            )}
          </div>
        </section>
      </section>
    </>
  );
}
