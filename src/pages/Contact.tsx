import IconLocation from "../assets/icons/IconLocation";

export default function Contact() {
	return (
		<>
			<section className="container" id="contact">
				<div className="contact-info">
					<h1>
						Let's Chat, Reach Out to Us
					</h1>
					<p className="mt-1">
						Have questions or feedback? We’re Here to help. Send us
						a message and we’ll respond in our working hours
					</p>
					<div className="card-bordered mt-1">
						<div>
							<div className="flex gap-05">
								<div className="highlight">
									<IconLocation width="20" height="20" />
								</div>
								<p className="semibold">Rumah Michelle</p>
							</div>
							<p className="mt-05">
								Sungai Jawi, Kec. Pontianak Kota, Kota
								Pontianak, Kalimantan Barat , Pontianak Kota,
								Kota Pontianak, Kalimantan Barat, 628983167799
							</p>
							<div
								className="mt-1"
								style={{
									height: "200px",
									background: "lightgray",
								}}
							></div>
						</div>
					</div>
				</div>
				<div className="contact-form">
					<form className="mt-1-05">
						<div className="split-item gap-1">
							<div className="input-box w-100">
								<label htmlFor="name">
									First name <span className="accent">*</span>
								</label>
								<input
									type="text"
									id="name"
									name="name"
									placeholder="Edwin"
								/>
							</div>
							<div className="input-box w-100">
								<label htmlFor="label">
									Last name{" "}
									<span className="muted italic">
										(optional)
									</span>
								</label>
								<input
									type="text"
									id="label"
									name="label"
									placeholder="Hendly"
								/>
							</div>
						</div>

						<div className="input-box w-100 mt-1">
							<label htmlFor="phone">
								Phone Number (Whatsapp)
							</label>
							<div className="flex gap-05">
								<div className="flag-phone">
									<div className="flag">
										<div className="red"></div>
										<div className="white"></div>
									</div>
									<select
										name="countryPhone"
										id="countryPhone"
									>
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

						<div className="input-box w-100 mt-1">
							<label htmlFor="messages">Messages</label>
							<textarea name="messages" id="messages"></textarea>
						</div>

						<button type="button" className="btn w-100 mt-1-05">
							Contact Us
						</button>
					</form>
				</div>
			</section>
		</>
	);
}
