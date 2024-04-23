import PageHeader from "../components/PageHeader";
import CartData from "../assets/data/cart.json";
import { useState, useEffect, useMemo } from "react";
import { formatCurrencyRupiah } from "../utils/formatCurrency";
import IconMinus from "../assets/icons/IconMinus";
import IconPlus from "../assets/icons/IconPlus";
import IconCoupon from "../assets/icons/IconCoupon";

export default function ShoppingCart() {
	const [cart, setCart] = useState(CartData);
	const shipping = 0;
	const cartSubTotal = useMemo(() => {
		return cart.reduce((acc, c) => acc + c.subtotal, 0);
	}, cart);
	const total = cartSubTotal + shipping;

	return (
		<>
			<PageHeader
				title="Shopping Cart"
				navigations={["Home", "Shopping Cart"]}
			/>
			<section className="container" id="shopping-cart">
				<section className="shopping-cart-table">
					<header className="table-header">
						<h5>Product</h5>
						<h5>Price</h5>
						<h5>Quantity</h5>
						<h5>Subtotal</h5>
						<h5></h5>
					</header>
					<section className="table-body">
						{cart.map((c) => {
							return (
								<div className="table-body-row">
									<div className="table-body-col">
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
										<h4 className="semibold">
											{c.product.name}
										</h4>
									</div>
									<div className="table-body-col">
										{formatCurrencyRupiah(c.product.price)}
									</div>
									<div className="table-body-col">
										<button
											className="btn btn-empty btn-quantity no-hover no-pointer"
											style={{
												padding: ".5rem",
											}}
										>
											<div
												className="btn btn-circle btn-tertiary"
												style={{
													width: "30px",
													height: "30px",
												}}
											>
												<IconMinus
													width="8"
													height="2"
												/>
											</div>
											<p>0</p>
											<div
												className="btn btn-circle btn-tertiary"
												style={{
													width: "30px",
													height: "30px",
												}}
											>
												<IconPlus
													width="10"
													height="10"
												/>
											</div>
										</button>
									</div>
									<div className="table-body-col semibold">
										{formatCurrencyRupiah(c.subtotal)}
									</div>
									<div className="table-body-col">
										<button
											className="btn btn-circle btn-empty"
											style={{
												width: "30px",
												height: "30px",
											}}
										>
											x
										</button>
									</div>
								</div>
							);
						})}
					</section>
					<section className="table-footer">
						<button className="btn btn-tertiary">
							Return to shop
						</button>
						<button className="btn btn-tertiary">
							Update cart
						</button>
					</section>
				</section>

				<section className="shopping-cart-detail mt-2">
					<div className="card-coupon card-bordered">
						<h2>Add new Coupon</h2>
						<div
							className="card-bordered flex justify-between items-center flex-wrap"
							style={{
								padding: "1rem",
							}}
						>
							<div className="flex items-center gap-05">
								<IconCoupon width="24" height="24" />
								<input
									placeholder="Enter coupon"
									type="text"
									style={{
										border: "none",
										padding: "initial",
										color: "var(--black)",
									}}
								/>
							</div>
							<p className="semibold">Apply</p>
						</div>
					</div>
					<div className="cart-total">
						<h2>Card Total</h2>
						<div className="content-split mt-1-05 justify-between">
							<h5>Subtotal: </h5>
							<p className="medium">
								{formatCurrencyRupiah(cartSubTotal)}
							</p>
						</div>
						<hr className="mt-1" />
						<div className="content-split mt-1 justify-between">
							<h5>Shipping: </h5>
							<p className="medium">
								{shipping == 0
									? "Free"
									: formatCurrencyRupiah(shipping)}
							</p>
						</div>
						<hr className="mt-1" />
						<div className="content-split mt-1 justify-between semibold" style={{ fontSize: '1.125rem' }}>
							<h5>Total: </h5>
							<p>{formatCurrencyRupiah(total)}</p>
						</div>
						<button className="btn btn-full w-100 mt-1-05">
							Proceed to checkout
						</button>
					</div>
				</section>
			</section>
		</>
	);
}
