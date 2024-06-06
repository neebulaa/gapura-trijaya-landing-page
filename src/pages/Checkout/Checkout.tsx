import PageHeader from '@/commons/components/Layout/HomeLayout/PageHeader';
import AppModal from '@/commons/components/Public/AppModal';
import HeaderProgress from '@/commons/components/Public/HeaderProgress';
import { separator } from '@/commons/utils/Currency/Currency';
import useCheckoutController from '@/pages/Checkout/CheckoutController';
import { useEffect, useMemo, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Checkout() {
  /** Controller */
  const {} = useCheckoutController();

  const [cart, setCart] = useState([]);
  const [openModalConfirmationOrder, setOpenModalConfirmationOrder] = useState(false);
  const { pathname } = useLocation();

  const bIActive = useMemo(() => pathname == '/checkout/billing-information', [pathname]);
  const dActive = useMemo(() => pathname == '/checkout/delivery', [pathname]);
  const pActive = useMemo(() => pathname == '/checkout/payment', [pathname]);

  const [next, setNext] = useState('');

  useEffect(() => {
    switch (true) {
      case bIActive:
        setNext('/checkout/delivery');
        break;
      case dActive:
        setNext('/checkout/payment');
        break;
      case pActive:
        setNext('/checkout/success');
        break;
    }
  }, [bIActive, dActive, pActive]);

  return (
    <>
      <PageHeader title="Checkout" navigations={['Home', 'Shopping Cart', 'Checkout']} />
      <section className="container" id="checkout">
        <div className="checkout-content">
          {(bIActive || dActive || pActive) && (
            <>
              <HeaderProgress
                navigations={['Billing Information', 'Delivery', 'Payment']}
                actives={[bIActive || dActive || pActive, dActive || pActive, pActive]}
              />
              <hr className="mt-2 mb-2" />
            </>
          )}
          <Outlet />
        </div>
        <div className="checkout-summary">
          {pathname != '/checkout/success' && (
            <div className="card-bordered">
              <h2 className="mb-1-05">Order Summary</h2>
              <div className="summary-products">
                {cart?.map((c) => (
                  <div className="summary-product" key={c.id}>
                    <img
                      src={`${import.meta.env.VITE_APP_URL}${c.product.image}`}
                      alt={`${import.meta.env.VITE_APP_NAME} - ` + c.product.name}
                    />
                    <div className="summary-product-info">
                      <h5>
                        {c.product.name} x{c.quantity}
                      </h5>
                      <p>{separator(c.subtotal)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="content-split mt-1-05 justify-between">
                <h5>Subtotal: </h5>
                <p className="semibold">Rp. 80.000</p>
              </div>
              <hr className="mt-1" />
              <div className="content-split mt-1 justify-between">
                <h5>Shipping: </h5>
                <p className="semibold">Free</p>
              </div>
              <hr className="mt-1" />
              <div className="content-split mt-1 justify-between">
                <h5>Total: </h5>
                <p className="bold highlight" style={{ fontSize: '1.125rem' }}>
                  Rp 200.000
                </p>
              </div>

              {openModalConfirmationOrder && (
                <AppModal
                  title={'Confirmation Order'}
                  close={() => setOpenModalConfirmationOrder(false)}
                >
                  <div className="flex items-center justify-center">
                    <img
                      src={`${import.meta.env.VITE_APP_URL}./images/confirmation-order.png`}
                      alt={`${import.meta.env.VITE_APP_NAME} - confirmation order`}
                    />
                  </div>
                  <h3 className="text-center fs-1-250 bold">Confirmation Order</h3>
                  <p className="text-center mt-05">
                    Thank you for your purchase. Please note that once you check out, the order
                    cannot be cancelled. We appreciate your understanding.
                  </p>
                  <hr className="mt-2 mb-2" />
                  <div className="flex gap-1">
                    <Link to="/shop" className="w-100">
                      <button className="btn btn-outline w-100">Back to shop</button>
                    </Link>
                    <Link to={next} className="w-100">
                      <button className="btn w-100">Place Order</button>
                    </Link>
                  </div>
                </AppModal>
              )}

              {pathname != '/checkout/payment' && (
                <Link to={next}>
                  <button className="btn w-100 mt-2">Place Order</button>
                </Link>
              )}
              {pathname == '/checkout/payment' && (
                <button
                  className="btn w-100 mt-2"
                  onClick={() => {
                    setOpenModalConfirmationOrder(true);
                  }}
                >
                  Place Order
                </button>
              )}
            </div>
          )}

          {pathname == '/checkout/success' && (
            <div className="card-bordered">
              <div className="flex justify-between items-center">
                <h2>BCA Virtual Account</h2>
                <img
                  src={`${import.meta.env.VITE_APP_URL}./images/payment-method/bca.png`}
                  alt={`${import.meta.env.VITE_APP_NAME} - BCA Payment Method`}
                />
              </div>
              <hr className="mt-1 mb-1" />
              <div>
                <h5>Nomor Virtual Account:</h5>
                <p className="bold mt-05">089123123</p>
              </div>
              <div className="mt-1">
                <h5>Total Tagihan:</h5>
                <p className="bold mt-05">{separator(400000)}</p>
              </div>
              <hr className="mt-1 mb-1" />
              <Link to="/shop">
                <button className="btn w-100">Back to shop</button>
              </Link>
              <Link to="/profile/orders">
                <button className="btn mt-1 btn-outline w-100">Tracking Order Status</button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
