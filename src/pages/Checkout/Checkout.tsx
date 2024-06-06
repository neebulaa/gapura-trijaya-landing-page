import useCheckoutController from '@/pages/Checkout/CheckoutController';

export default function Checkout() {
  const {} = useCheckoutController();

  return (
    <div className="container">
      <h1>Checkout</h1>
    </div>
  );
}
