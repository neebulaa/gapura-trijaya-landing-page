export default function PersonalInformation() {
	return (
		<>
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
				<div className="input-box w-100 mt-1-05">
					<label htmlFor="email">
						Email <span className="muted italic">(optional)</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						placeholder="edwinhendly@gmail.com"
					/>
				</div>
				<div className="input-box w-100 mt-1-05">
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
				<div className="input-box w-100 mt-1-05">
					<label>
						Gender <span className="muted italic">(Optional)</span>
					</label>
					<div className="flex gap-1">
						<label
							htmlFor="gender-male"
							className="btn-link flex items-center gap-05"
						>
							<input
								type="radio"
								style={{
									width: "15px",
									height: "15px",
								}}
								name="gender"
								id="gender-male"
							/>
							<span className="btn-link">Male</span>
						</label>
						<label
							htmlFor="gender-female"
							className="btn-link flex items-center gap-05"
						>
							<input
								type="radio"
								style={{
									width: "15px",
									height: "15px",
								}}
								name="gender"
								id="gender-female"
							/>
							<span className="btn-link">Female</span>
						</label>
					</div>
				</div>
				<div className="input-box w-100 mt-1-05">
					<label>Tanggal Lahir</label>
					<div className="flex gap-1 flex-items-fill">
						<select name="birth-date" id="birth-date">
							{Array(30)
								.fill(0)
								.map((_, i) => (
									<option key={i} value={i + 1}>
										{i + 1}
									</option>
								))}
						</select>
						<select name="birth-date" id="birth-date">
							<option value="january">January</option>
							<option value="februari">February</option>
							<option value="march">March</option>
							<option value="april">April</option>
							<option value="mei">Mei</option>
							<option value="june">June</option>
							<option value="july">July</option>
							<option value="august">August</option>
							<option value="september">September</option>
							<option value="october">October</option>
							<option value="november">November</option>
							<option value="december">December</option>
						</select>
						<select name="birth-date" id="birth-date">
							{Array(50)
								.fill(0)
								.map((_, i) => (
									<option key={i} value={1974 + i + 1}>
										{1974 + i + 1}
									</option>
								))}
						</select>
					</div>
				</div>
				<button className="btn mt-1">Save</button>
			</form>
		</>
	);
}
