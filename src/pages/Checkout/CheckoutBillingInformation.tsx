export default function CheckoutBillingInformation() {
	return (
		<section
			className="checkout-content-body"
			id="checkout-billing-information"
		>
			<h2 className="mb-1-05">Contact Details</h2>
			<form>
				<div className="split-item gap-1">
					<div className="input-box w-100">
						<label htmlFor="firstName">
							First Name <span className="accent">*</span>
						</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							placeholder="Edwin"
						/>
					</div>
					<div className="input-box w-100">
						<label htmlFor="lastName">
							Last Name{" "}
							<span className="muted italic">(optional)</span>
						</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							placeholder="Hendly"
						/>
					</div>
				</div>
				<div className="input-box w-100 mt-1">
					<label htmlFor="email">Email (optional)</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="edwinhendly@gmail.com"
					/>
				</div>
				<div className="input-box w-100 mt-1">
					<label htmlFor="phone">Phone Number (Whatsapp)</label>
					<div className="flex gap-05">
						<div className="flag-phone">
							<div className="flag">
								<div className="red"></div>
								<div className="white"></div>
							</div>
							<select name="countryPhone" id="countryPhone">
								<option value="indonesia">+62</option>
								<option value="malaysia">+60</option>
								<option value="singapore">+65</option>
							</select>
						</div>
						<input
							className="w-100"
							type="text"
							id="phone"
							name="phone"
							placeholder="089796245748"
						/>
					</div>
				</div>
			</form>

			<h2 className="mt-3 mb-1-05">Additional Info</h2>
			<div className="input-box w-100">
				<label htmlFor="orderNote">Order Note (optional)</label>
				<textarea name="orderNote" id="orderNote" rows={4}></textarea>
			</div>
		</section>
	);
}
