import { Link } from "react-router-dom";
import IconEye from "../assets/icons/IconEye";
export default function Register() {
	return (
		<section className="container" id="register">
			<div className="register-form">
				<h1>Register</h1>
				<p>Hey, enter your details to get create your account</p>
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
								<span className="muted italic">(optional)</span>
							</label>
							<input
								type="text"
								id="label"
								name="label"
								placeholder="Hendly"
							/>
						</div>
					</div>

					<div className="input-box w-100 mt-1-05">
						<label htmlFor="Address">
							Email{" "}
							<span className="muted italic">(optional)</span>
						</label>
						<input type="text" id="Address" name="Address" />
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
						<label htmlFor="password">
							New Password <span className="accent">*</span>
						</label>
						<div className="input-icon">
							<input
								id="password"
								name="password"
								type="password"
							/>
							<IconEye width="24" height="24" className="mr-05" />
						</div>
					</div>

					<button type="button" className="btn w-100 mt-1-05">
						Register
					</button>
				</form>
				<Link
					to="/login"
					className="flex mt-1 highlight justify-center"
				>
					Already have account? Login now!
				</Link>
			</div>
			<div className="register-image">
				<img
					className="register-image-main"
					src={`${import.meta.env.VITE_APP_URL}./images/register.png`}
					alt={`${
						import.meta.env.VITE_APP_NAME
					} - hero image register`}
				/>

				{/* image decoration */}
				<img
					className="register-image-1"
					src={`${
						import.meta.env.VITE_APP_URL
					}./images/decoration.png`}
					alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
					style={{
						zIndex: -1,
						position: "absolute",
						top: "70%",
						left: "98%",
					}}
				/>

				<img
					className="register-image-2"
					src={`${
						import.meta.env.VITE_APP_URL
					}./images/decoration.png`}
					alt={`${import.meta.env.VITE_APP_NAME} - Pattern Left `}
					style={{
						zIndex: -1,
						position: "absolute",
						top: 0,
						left: 0,
						translate: "-120% -50%",
					}}
				/>
			</div>
		</section>
	);
}
