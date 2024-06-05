import { ApiImgUrl } from '@/commons/utils/ApiImgUrl';
import { separator } from '@/commons/utils/Currency/Currency';
import useShoppingCartController from '@/pages/ShoppingCart/ShoppingCartController';
import { Link } from 'react-router-dom';

type CartPopupProps = {
  close: Function;
};

export default function CartPopUp({ close }: CartPopupProps) {
  // const cart = [
  //   {
  //     id: 1,
  //     product: {
  //       name: 'Product Name',
  //       image: '/noimg.png',
  //     },
  //     quantity: 2,
  //     subtotal: 50000,
  //   },
  //   {
  //     id: 2,
  //     product: {
  //       name: 'Product Name',
  //       image: '/noimg.png',
  //     },
  //     quantity: 3,
  //     subtotal: 75000,
  //   },
  // ];
  const { cartData, subtotal, shippingCost, total } = useShoppingCartController();

  return (
    <section
      className="popup-cart"
      onClick={(e) => {
        if (e.target == e.currentTarget) {
          close();
        }
      }}
    >
      <div
        className="popup-cart-content"
        style={{
          top: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          right: 0,
          left: 'initial',
          translate: '0 0',
        }}
      >
        <h2>Shopping Cart</h2>
        <hr className="mt-1-05 mb-1" />
        <div className="popup-cart-products">
          {cartData?.data?.items?.map((cart) => (
            <div className="popup-cart-product" key={cart.id}>
              <img
                src={ApiImgUrl(cart.product.images[0]?.path)}
                alt={`${import.meta.env.VITE_APP_NAME} - ` + cart.product.name}
              />
              <div className="popup-cart-product-desc w-100">
                <div className="popup-cart-product-title">
                  <h3>{cart.product.name}</h3>
                  <p>{cart.quantity} items</p>
                </div>
                <p className="popup-cart-product-price">{`Rp ${separator(cart.subtotal)}`}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="mt-2 mb-1" />
        <div className="mb-2 flex justify-between items-center">
          <h3>Total</h3>
          <h2 className="highlight">Rp {separator(total)}</h2>
        </div>

        <Link to="/cart">
          <button className="btn w-100" onClick={() => close()}>
            Show Shopping Cart
          </button>
        </Link>
        <Link to="/shop">
          <button className="btn btn-tertiary w-100 mt-05" onClick={() => close()}>
            Go Shopping
          </button>
        </Link>
      </div>
    </section>
  );
}
