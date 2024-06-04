import { separator } from '@/commons/utils/Currency/Currency';
import { Link } from 'react-router-dom';

type CartPopupProps = {
  close: Function;
};

export default function CartPopUp({ close }: CartPopupProps) {
  const cart = [
    {
      id: 1,
      product: {
        name: 'Product Name',
        image: '/noimg.png',
      },
      quantity: 2,
      subtotal: 50000,
    },
    {
      id: 2,
      product: {
        name: 'Product Name',
        image: '/noimg.png',
      },
      quantity: 3,
      subtotal: 75000,
    },
  ];

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
          {cart.map((c) => (
            <div className="popup-cart-product" key={c.id}>
              <img
                src={`${import.meta.env.VITE_APP_URL}${c.product.image}`}
                alt={`${import.meta.env.VITE_APP_NAME} - ` + c.product.name}
              />
              <div className="popup-cart-product-desc w-100">
                <div className="popup-cart-product-title">
                  <h3>{c.product.name}</h3>
                  <p>{c.quantity} items</p>
                </div>
                <p className="popup-cart-product-price">{`Rp ${separator(c.subtotal)}`}</p>
              </div>
            </div>
          ))}
        </div>

        <hr className="mt-2 mb-1" />
        <div className="mb-2 flex justify-between items-center">
          <h3>Total</h3>
          <h2 className="highlight">Rp 250.000,00</h2>
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
