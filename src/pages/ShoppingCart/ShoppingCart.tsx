import IconCoupon from '@/commons/assets/icons/IconCoupon';
import IconMinus from '@/commons/assets/icons/IconMinus';
import IconPlus from '@/commons/assets/icons/IconPlus';
import IconPoin from '@/commons/assets/icons/IconPoin';
import PageHeader from '@/commons/components/Layout/HomeLayout/PageHeader';
import { separator } from '@/commons/utils/Currency/Currency';
import { Link } from 'react-router-dom';
import ToggleCheckboxButton from '@/pages/ShoppingCart/components/ToggleCheckboxButton';
import useShoppingCartController from '@/pages/ShoppingCart/ShoppingCartController';

export default function ShoppingCart() {
  const {} = useShoppingCartController();

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
              <div className="table-body-row">
                <div className="table-body-col">
                  <img src={`/noimg.png`} alt={``} />
                  <h4 className="semibold">{`Lorem ipsum dolor sit, amet consectetur.`}</h4>
                </div>
                <div className="table-body-col">{`Rp ${separator(20000)}`}</div>
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
                      // onClick={() => console.log(c.id)}
                    >
                      <IconMinus width="8" height="2" />
                    </div>
                    <p>{`5`}</p>
                    <div
                      className="btn btn-circle btn-tertiary"
                      style={{
                        width: '30px',
                        height: '30px',
                      }}
                      // onClick={() => console.log('')}
                    >
                      <IconPlus width="10" height="10" />
                    </div>
                  </button>
                </div>
                <div className="table-body-col semibold">{`Rp ${separator(4000)}`}</div>
                <div className="table-body-col">
                  <button
                    // onClick={() => removeCartItem(c.id)}
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
            <h2>Card Total</h2>
            <div className="content-split mt-1-05 justify-between">
              <h5>Subtotal: </h5>
              <p className="medium">Rp {separator(3000)}</p>
            </div>
            <hr className="mt-1" />
            <div className="content-split mt-1 justify-between">
              <h5>Shipping: </h5>
              <p className="medium">Rp {separator(2000)}</p>
            </div>
            <hr className="mt-1" />
            <div
              className="content-split mt-1 justify-between semibold"
              style={{ fontSize: '1.125rem' }}
            >
              <h5>Total: </h5>
              <p>{`Rp ${separator(20000)}`}</p>
            </div>
            <Link to="/checkout/billing-information">
              <button className="btn btn-full w-100 mt-1-05">Proceed to checkout</button>
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}
