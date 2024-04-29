import PageHeader from "../../components/PageHeader";
import useLocalStorage from "../../hooks/useLocalStorage";
import CartData from "../../assets/data/cart.json";
import { formatCurrencyRupiah } from "../../utils/formatCurrency";
import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import HeaderProgress from "../../components/HeaderProgress";

export default function CheckoutMain() {
	const [cart, setCart] = useLocalStorage("shopping-cart", CartData);
	const [shippingMethod, setShippingMethod] = useState("delivery");
	const { pathname } = useLocation();

	const bIActive = pathname == "/checkout/billing-information";
	const dActive = pathname == "/checkout/delivery";
	const pActive = pathname == "/checkout/payment";

	let next = "";
	switch (true) {
		case bIActive:
			next = "/checkout/delivery";
			break;
		case dActive:
			next = "/checkout/payment";
			break;
		case pActive:
			next = "/checkout/success";
			break;
	}

	return (
		<>
			<PageHeader
				title="Checkout"
				navigations={["Home", "Shopping Cart", "Checkout"]}
			/>
			<section className="container" id="checkout">
				<div className="checkout-content">
					{(bIActive || dActive || pActive) && (
						<>
							<HeaderProgress
								navigations={[
									"Billing Information",
									"Delivery",
									"Payment",
								]}
								actives={[
									bIActive || dActive || pActive,
									dActive || pActive,
									pActive,
								]}
							/>
							<hr className="mt-2 mb-2" />
						</>
					)}
					<Outlet />
				</div>
				<div className="checkout-summary">
					{pathname != "/checkout/success" && (
						<div className="card-bordered">
							<h2 className="mb-1-05">Order Summary</h2>
							<div className="summary-products">
								{cart.map((c) => (
									<div className="summary-product" key={c.id}>
										<img
											src={`${
												import.meta.env.VITE_APP_URL
											}${c.product.image}`}
											alt={
												`${
													import.meta.env
														.VITE_APP_NAME
												} - ` + c.product.name
											}
										/>
										<div className="summary-product-info">
											<h5>
												{c.product.name} x{c.quantity}
											</h5>
											<p>
												{formatCurrencyRupiah(
													c.subtotal
												)}
											</p>
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
								<p
									className="bold highlight"
									style={{ fontSize: "1.125rem" }}
								>
									Rp 200.000
								</p>
							</div>

							{/* <h2 className="mt-1-05">Shipping Method</h2>
							<div className="flex gap-1 mt-1">
								<div className="flex gap-05">
									<input
										type="radio"
										name="shipping-method"
										id="delivery"
										checked={shippingMethod == "delivery"}
										onChange={() =>
											setShippingMethod("delivery")
										}
									/>
									<label htmlFor="delivery">Delivery</label>
								</div>

								<div className="flex gap-05">
									<input
										type="radio"
										name="shipping-method"
										id="in-store-pickup"
										checked={
											shippingMethod == "in-store-pickup"
										}
										onChange={() =>
											setShippingMethod("in-store-pickup")
										}
									/>
									<label htmlFor="in-store-pickup">
										In-Store Pickup
									</label>
								</div>
							</div> */}

							<Link to={next}>
								<button className="btn w-100 mt-2">
									Place Order
								</button>
							</Link>
						</div>
					)}

					{pathname == "/checkout/success" && (
						<div className="card-bordered">
							<div className="flex justify-between items-center">
								<h2>BCA Virtual Account</h2>
								<img
									src={`${
										import.meta.env.VITE_APP_URL
									}./images/payment-method/bca.png`}
									alt={`${
										import.meta.env.VITE_APP_NAME
									} - BCA Payment Method`}
								/>
							</div>
							<hr className="mt-1 mb-1" />
							<div>
								<h5>Nomor Virtual Account:</h5>
								<p className="bold mt-05">089123123</p>
							</div>
							<div className="mt-1">
								<h5>Total Tagihan:</h5>
								<p className="bold mt-05">
									{formatCurrencyRupiah(400000)}
								</p>
							</div>
							<hr className="mt-1 mb-1" />
							<button className="btn w-100">Back to shop</button>
							<button className="btn mt-1 btn-outline w-100">
								Tracking Order Status
							</button>
						</div>
					)}
				</div>
			</section>
		</>
	);
}
