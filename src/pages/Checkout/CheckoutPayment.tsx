export default function CheckoutPayment() {
	return (
		<section className="checkout-content-body" id="checkout-delivery">
			<h2 className="mb-1-05">Payment Method</h2>
			<label
				htmlFor="paymentMethod-bca"
				className="card-bordered flex items-center pointer"
				style={{
					padding: ".5rem 1.25rem",
				}}
			>
				<div className="flex gap-1 items-center">
					<input
						type="radio"
						id="paymentMethod-bca"
						name="paymentMethod"
					/>

					<img
						src={`${
							import.meta.env.VITE_APP_URL
						}./images/payment-method/bca.png`}
						alt={`${
							import.meta.env.VITE_APP_NAME
						} - BCA Payment Method`}
					/>
					<span>BCA Virtual Account</span>
				</div>
			</label>
			<label
				htmlFor="paymentMethod-mandiri"
				className="card-bordered flex items-center pointer mt-05"
				style={{
					padding: ".5rem 1.25rem",
				}}
			>
				<div className="flex gap-1 items-center">
					<input
						type="radio"
						id="paymentMethod-mandiri"
						name="paymentMethod"
					/>

					<img
						src={`${
							import.meta.env.VITE_APP_URL
						}./images/payment-method/mandiri.png`}
						alt={`${
							import.meta.env.VITE_APP_NAME
						} - Mandiri Payment Method`}
					/>
					<span>Mandiri Virtual Account</span>
				</div>
			</label>
			<label
				htmlFor="paymentMethod-qris"
				className="card-bordered flex items-center pointer mt-05"
				style={{
					padding: ".5rem 1.25rem",
				}}
			>
				<div className="flex gap-1 items-center">
					<input
						type="radio"
						id="paymentMethod-qris"
						name="paymentMethod"
					/>

					<img
						src={`${
							import.meta.env.VITE_APP_URL
						}./images/payment-method/qris.png`}
						alt={`${
							import.meta.env.VITE_APP_NAME
						} - QRIS Payment Method`}
					/>
					<span>QRIS</span>
				</div>
			</label>
		</section>
	);
}
